import {db} from '../Config/FirebaseConfig';


// Notification Service
export const createNotification = async (notification) => {
    const notificationsRef = db.collection('notifications');
    await notificationsRef.add(notification);
  };
  
  export const getNotifications = async (userId) => {
    const notificationsRef = db.collection('notifications');
    const snapshot = await notificationsRef.where('userId', '==', userId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
  
  export const markAsRead = async (notificationId) => {
    const notificationRef = db.collection('notifications').doc(notificationId);
    await notificationRef.update({ status: 'read' });
  };