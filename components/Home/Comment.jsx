import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Alert, Text, TouchableOpacity } from 'react-native';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo'; // Import Clerk's useUser hook
import { app } from '../../Config/FirebaseConfig'; // Ensure this path is correct

const db = getFirestore(app);

export default function Comment({ postId, onClose }) {
    const { user } = useUser(); // Get the logged-in user from Clerk
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);

    const handleSendComment = async () => {
        if (commentText.trim() === '') return;

        if (!postId || !user) {
            Alert.alert('Error', 'Missing required information. Please try again.');
            console.error('Missing required information:', { postId, user });
            return;
        }

        try {
            const commentsCollection = collection(db, 'comments');
            await addDoc(commentsCollection, {
                postId,
                userId: user.id,
                userName: user.firstName || 'Anonymous', // Use user's first name or 'Anonymous'
                text: commentText,
                timestamp: new Date(),
            });
            setCommentText('');
        } catch (error) {
            Alert.alert('Error', 'Failed to send comment. Please try again.');
            console.error('Error adding document: ', error);
        }
    };

    useEffect(() => {
        if (!postId) return;

        const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const commentsData = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().postId === postId) {
                    commentsData.push({ ...doc.data(), id: doc.id });
                }
            });
            setComments(commentsData);
        });

        return () => unsubscribe();
    }, [postId]);

    return (
        <View style={styles.container}>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        <Text style={styles.userName}>{item.userName}: </Text>
                        <Text style={styles.commentText}>{item.text}</Text>
                    </View>
                )}
            />
            {user ? (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={commentText}
                        onChangeText={setCommentText}
                        placeholder="Write a comment..."
                        placeholderTextColor="#aaa"
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={styles.loginMessage}>Please log in to comment.</Text>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
        paddingVertical: 8,
    },
    userName: {
        fontWeight: 'bold',
        marginBottom: 2,
        color: '#333',
        fontSize: 16,
    },
    commentText: {
        color: '#555',
        fontSize: 14,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 8,
        marginTop: 10,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#f9f9f9',
        fontSize: 14,
        marginRight: 8,
    },
    sendButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    closeButton: {
        marginTop: 16,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#007AFF',
        fontSize: 16,
    },
    loginMessage: {
        color: '#555',
        fontSize: 14,
        marginTop: 10,
    },
});
