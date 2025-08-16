import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface Notification {
  title: string;
  description: string;
  icon?: string; // Optional icon URL
  isUnread?: boolean; // Indicates if the notification is unread
}

interface NotificationCardProps {
  notification: Notification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  return (
    <View
      style={[
        styles.card,
        notification.isUnread ? styles.unreadCard : null,
      ]}
    >
      <View style={styles.iconContainer}>
        {notification.icon ? (
          <Image source={{ uri: notification.icon }} style={styles.icon} />
        ) : null}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.description}>{notification.description}</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreButtonText}>•••</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#EEEEEE',
    borderWidth: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F1F4',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  moreButton: {
    padding: 10,
  },
  moreButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
  },
  unreadCard: {
    backgroundColor: '#EAF4FF',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
  },
  description: {
    fontSize: 14,
    color: 'rgba(17, 17, 17, 0.5)',
    marginTop: 5,
  },
});

export default NotificationCard;