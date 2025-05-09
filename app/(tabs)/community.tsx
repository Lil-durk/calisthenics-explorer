import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar, Image, TextInput, TouchableOpacity, Platform, Dimensions, Share, Modal, FlatList, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Common interfaces
interface Comment {
  id: string;
  user: string;
  text: string;
  timeAgo: string;
  likes: number;
  isLiked: boolean;
  replies: Reply[];
}

interface Reply {
  id: string;
  user: string;
  text: string;
  timeAgo: string;
  likes: number;
  isLiked: boolean;
}

// Reusable components
const CommentSection = ({ comments, onAddComment, onAddReply, onLikeComment, onClose }: {
  comments: Comment[];
  onAddComment: (text: string) => void;
  onAddReply: (commentId: string, text: string) => void;
  onLikeComment: (commentId: string, replyId?: string) => void;
  onClose: () => void;
}) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const renderReply = (reply: Reply, commentId: string) => (
    <View style={styles.replyContainer}>
      <Image 
        source={{ uri: 'https://i.pravatar.cc/150?u=' + reply.id }} 
        style={styles.replyAvatar} 
      />
      <View style={styles.replyContent}>
        <View style={styles.replyHeader}>
          <Text style={styles.replyUsername}>{reply.user}</Text>
          <Text style={styles.replyTime}>{reply.timeAgo}</Text>
        </View>
        <Text style={styles.replyText}>{reply.text}</Text>
        <View style={styles.replyActions}>
          <TouchableOpacity 
            style={styles.replyAction}
            onPress={() => onLikeComment(commentId, reply.id)}
          >
            <Ionicons 
              name={reply.isLiked ? "heart" : "heart-outline"} 
              size={16} 
              color={reply.isLiked ? "#ff3b30" : "#666"} 
            />
            <Text style={[styles.replyActionText, reply.isLiked && styles.likedCount]}>
              {formatCount(reply.likes)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <Image 
        source={{ uri: 'https://i.pravatar.cc/150?u=' + item.id }} 
        style={styles.commentAvatar} 
      />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentUsername}>{item.user}</Text>
          <Text style={styles.commentTime}>{item.timeAgo}</Text>
        </View>
        <Text style={styles.commentText}>{item.text}</Text>
        <View style={styles.commentActions}>
          <TouchableOpacity 
            style={styles.commentAction}
            onPress={() => onLikeComment(item.id)}
          >
            <Ionicons 
              name={item.isLiked ? "heart" : "heart-outline"} 
              size={16} 
              color={item.isLiked ? "#ff3b30" : "#666"} 
            />
            <Text style={[styles.commentActionText, item.isLiked && styles.likedCount]}>
              {formatCount(item.likes)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.commentAction}
            onPress={() => setReplyingTo(item.id)}
          >
            <Ionicons name="chatbubble-outline" size={16} color="#666" />
            <Text style={styles.commentActionText}>Reply</Text>
          </TouchableOpacity>
        </View>

        {item.replies.length > 0 && (
          <View style={styles.repliesContainer}>
            {item.replies.map(reply => (
              <View key={reply.id}>
                {renderReply(reply, item.id)}
              </View>
            ))}
          </View>
        )}

        {replyingTo === item.id && (
          <View style={styles.replyInputContainer}>
            <TextInput
              style={styles.replyInput}
              placeholder="Write a reply..."
              value={replyText}
              onChangeText={setReplyText}
              multiline
            />
            <TouchableOpacity 
              style={[styles.sendButton, !replyText.trim() && styles.sendButtonDisabled]}
              onPress={() => {
                onAddReply(item.id, replyText);
                setReplyText('');
                setReplyingTo(null);
              }}
              disabled={!replyText.trim()}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={replyText.trim() ? '#1BA7EB' : '#ccc'} 
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Comments</Text>
        <TouchableOpacity 
          onPress={onClose}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={item => item.id}
        style={styles.commentsList}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.commentInputContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, !newComment.trim() && styles.sendButtonDisabled]}
          onPress={() => {
            onAddComment(newComment);
            setNewComment('');
          }}
          disabled={!newComment.trim()}
        >
          <Ionicons 
            name="send" 
            size={24} 
            color={newComment.trim() ? '#1BA7EB' : '#ccc'} 
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

// Utility functions
const formatCount = (count: number) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const truncateText = (text: string, maxWords: number = 30) => {
  const words = text.split(' ');
  if (words.length <= maxWords) return { text, isTruncated: false };
  return {
    text: words.slice(0, maxWords).join(' '),
    isTruncated: true
  };
};

const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) return text;
  
  try {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => {
      if (part.toLowerCase() === searchTerm.toLowerCase()) {
        return (
          <Text key={i} style={{ 
            backgroundColor: '#FFEB3B', 
            color: '#000',
            fontWeight: 'bold',
            paddingHorizontal: 2,
            borderRadius: 4
          }}>
            {part}
          </Text>
        );
      }
      return part;
    });
  } catch (e) {
    return text;
  }
};

const generateComments = (postType: string): Comment[] => {
  const comments: Comment[] = [];
  const commentCount = Math.floor(Math.random() * 5) + 1; // Random number between 1 and 5

  const commentTemplates = {
    park: [
      "This park looks amazing! I'll definitely check it out next weekend.",
      "Great facilities! I've been training here for months.",
      "Perfect spot for beginners and advanced athletes alike.",
      "The community here is so supportive!",
      "Love the lighting setup for evening workouts."
    ],
    daily: [
      "Keep up the good work! 💪",
      "Great progress on your daily tasks!",
      "Consistency is key! You're doing great.",
      "Nice job completing all your tasks!",
      "Inspiring others with your dedication!"
    ],
    achievement: [
      "Congratulations on the PR! 🎉",
      "That's impressive progress!",
      "Keep pushing your limits!",
      "Amazing work! What's your next goal?",
      "You're making great progress!"
    ],
    default: [
      "Great post! Thanks for sharing.",
      "This is really helpful information!",
      "Keep up the good work!",
      "Thanks for the inspiration!",
      "Looking forward to more content!"
    ]
  };

  const templates = commentTemplates[postType as keyof typeof commentTemplates] || commentTemplates.default;

  for (let i = 0; i < commentCount; i++) {
    const randomUser = `User${Math.floor(Math.random() * 1000)}`;
    const randomTime = `${Math.floor(Math.random() * 24)}h ago`;
    const randomLikes = Math.floor(Math.random() * 50);
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];

    comments.push({
      id: `comment-${i}`,
      user: randomUser,
      text: randomTemplate,
      timeAgo: randomTime,
      likes: randomLikes,
      isLiked: false,
      replies: []
    });
  }

  return comments;
};

// Base Post component with common functionality
const BasePost = ({ 
  username, 
  timeAgo, 
  content, 
  imageUrl, 
  initialLikes = 0,
  initialComments = 0,
  initialBookmarks = 0,
  initialShares = 0,
  searchTerm = '',
  onShare,
  children,
  postType = 'default'
}: {
  username: string;
  timeAgo: string;
  content: string;
  imageUrl?: string;
  initialLikes?: number;
  initialComments?: number;
  initialBookmarks?: number;
  initialShares?: number;
  searchTerm?: string;
  onShare?: () => void;
  children?: React.ReactNode;
  postType?: string;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [commentCount, setCommentCount] = useState(initialComments);
  const [bookmarkCount, setBookmarkCount] = useState(initialBookmarks);
  const [shareCount, setShareCount] = useState(initialShares);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>(generateComments(postType));
  const [isExpanded, setIsExpanded] = useState(false);

  const { text: displayText, isTruncated } = truncateText(content);
  const finalText = isExpanded ? content : displayText;

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setBookmarkCount(prev => isBookmarked ? prev - 1 : prev + 1);
  };

  const handleComment = () => {
    setIsCommentModalVisible(true);
  };

  const handleShare = async () => {
    if (onShare) {
      onShare();
      setShareCount(prev => prev + 1);
    }
  };

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      user: 'Current User',
      text,
      timeAgo: 'Just now',
      likes: 0,
      isLiked: false,
      replies: []
    };
    setComments(prev => [newComment, ...prev]);
    setCommentCount(prev => prev + 1);
  };

  const handleAddReply = (commentId: string, text: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        const newReply: Reply = {
          id: Date.now().toString(),
          user: 'Current User',
          text,
          timeAgo: 'Just now',
          likes: 0,
          isLiked: false
        };
        return {
          ...comment,
          replies: [...comment.replies, newReply]
        };
      }
      return comment;
    }));
  };

  const handleLikeComment = (commentId: string, replyId?: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        if (replyId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === replyId) {
                return {
                  ...reply,
                  isLiked: !reply.isLiked,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                };
              }
              return reply;
            })
          };
        } else {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          };
        }
      }
      return comment;
    }));
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image 
          source={{ uri: 'https://i.pravatar.cc/150?u=' + username }} 
          style={styles.postProfileImage} 
        />
        <View style={styles.postHeaderInfo}>
          <Text style={styles.postUsername}>
            {highlightText(username, searchTerm)}
          </Text>
          <Text style={styles.postTime}>{timeAgo}</Text>
        </View>
      </View>

      <View style={styles.postContentContainer}>
        <Text style={styles.postText}>
          {highlightText(finalText, searchTerm)}
          {isTruncated && (
            <Text onPress={() => setIsExpanded(!isExpanded)}>
              <Text style={styles.moreText}>
                {isExpanded ? ' Show less' : '... More'}
              </Text>
            </Text>
          )}
        </Text>

        {imageUrl && (
          <Image 
            source={{ uri: imageUrl }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}

        {children}

        <View style={styles.interactionContainer}>
          <TouchableOpacity 
            style={styles.interactionButton}
            onPress={handleLike}
          >
            <Ionicons 
              name={isLiked ? "heart" : "heart-outline"} 
              size={24} 
              color={isLiked ? "#ff3b30" : "#000"} 
            />
            <Text style={[styles.interactionCount, isLiked && styles.likedCount]}>
              {formatCount(likeCount)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.interactionButton}
            onPress={handleComment}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#000" />
            <Text style={styles.interactionCount}>{formatCount(commentCount)}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.interactionButton}
            onPress={handleBookmark}
          >
            <Ionicons 
              name={isBookmarked ? "bookmark" : "bookmark-outline"} 
              size={24} 
              color={isBookmarked ? "#007AFF" : "#000"} 
            />
            <Text style={[styles.interactionCount, isBookmarked && styles.bookmarkedCount]}>
              {formatCount(bookmarkCount)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.interactionButton}
            onPress={handleShare}
          >
            <Ionicons name="share-outline" size={24} color="#000" />
            <Text style={styles.interactionCount}>{formatCount(shareCount)}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isCommentModalVisible}
        onRequestClose={() => setIsCommentModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <CommentSection
            comments={comments}
            onAddComment={handleAddComment}
            onAddReply={handleAddReply}
            onLikeComment={handleLikeComment}
            onClose={() => setIsCommentModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

// Specific post components using BasePost
const Post = ({ searchTerm = '' }: { searchTerm?: string }) => (
  <BasePost
    username="Park of the Month"
    timeAgo="2 hours ago"
    content="Welcome to our Park of the Month feature! This month we're highlighting the amazing calisthenics park in Amsterdam. This state-of-the-art facility offers everything a calisthenics enthusiast could dream of, from pull-up bars to parallel bars, and even a dedicated area for advanced movements. The park is open 24/7 and features proper lighting for evening workouts. Whether you're a beginner or an advanced athlete, this park has something for everyone. The community here is incredibly supportive, and you'll often find experienced athletes willing to share tips and techniques. Don't miss out on the weekly meetups where athletes from all levels come together to train and share their passion for calisthenics."
    imageUrl="https://images.unsplash.com/photo-1571902943202-507ec2618e8f"
    initialLikes={1200}
    initialComments={245}
    initialBookmarks={89}
    initialShares={56}
    searchTerm={searchTerm}
    postType="park"
    onShare={async () => {
      try {
        await Share.share({
          message: "Check out this amazing calisthenics park in Amsterdam!",
          url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f',
          title: 'Park of the Month - Calisthenics Explorer'
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }}
  />
);

const DailyTaskPost = ({ searchTerm = '' }: { searchTerm?: string }) => (
  <BasePost
    username="Alex Johnson"
    timeAgo="1 hour ago"
    content="Completed his Daily Tasks:"
    initialLikes={24}
    initialComments={8}
    initialBookmarks={3}
    initialShares={2}
    searchTerm={searchTerm}
    postType="daily"
    onShare={async () => {
      try {
        await Share.share({
          message: "Check out my completed daily tasks!",
          title: 'Daily Tasks - Calisthenics Explorer'
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }}
  >
    <View style={styles.taskList}>
      <View style={styles.taskItem}>
        <Text style={styles.taskCheck}>✔️</Text>
        <Text style={styles.taskText}>
          {highlightText('Drank 2L Of water', searchTerm)}
        </Text>
      </View>
      <View style={styles.taskItem}>
        <Text style={styles.taskCheck}>✔️</Text>
        <Text style={styles.taskText}>
          {highlightText('Completed morning workout', searchTerm)}
        </Text>
      </View>
      <View style={styles.taskItem}>
        <Text style={styles.taskCheck}>✔️</Text>
        <Text style={styles.taskText}>
          {highlightText('Tracked nutrition', searchTerm)}
        </Text>
      </View>
    </View>
  </BasePost>
);

const AchievementPost = ({ searchTerm = '' }: { searchTerm?: string }) => (
  <BasePost
    username="Sarah Wilson"
    timeAgo="2 hours ago"
    content="Just hit a new PR on pull-ups! 💪 15 reps in one set! The consistent training is finally paying off. Keep pushing everyone! #CalisthenicsProgress"
    initialLikes={42}
    initialComments={15}
    initialBookmarks={7}
    initialShares={4}
    searchTerm={searchTerm}
    postType="achievement"
    onShare={async () => {
      try {
        await Share.share({
          message: "Just hit a new PR on pull-ups! 15 reps in one set! 💪",
          title: 'New PR - Calisthenics Explorer'
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }}
  />
);

const ParkHighlightPost = ({ searchTerm = '' }: { searchTerm?: string }) => (
  <BasePost
    username="Calisthenics Explorer"
    timeAgo="3 hours ago"
    content="🌟 Hidden Gem Alert! 🌟\nDiscovered this amazing calisthenics park in Rotterdam. Perfect for all skill levels with dedicated areas for beginners and advanced athletes. The community here is incredibly supportive!"
    imageUrl="https://images.unsplash.com/photo-1571902943202-507ec2618e8f"
    initialLikes={156}
    initialComments={32}
    initialBookmarks={45}
    initialShares={28}
    searchTerm={searchTerm}
    postType="park"
    onShare={async () => {
      try {
        await Share.share({
          message: "🌟 Hidden Gem Alert! 🌟\nDiscovered this amazing calisthenics park in Rotterdam. Perfect for all skill levels with dedicated areas for beginners and advanced athletes. The community here is incredibly supportive!",
          title: 'New Park Highlight - Calisthenics Explorer'
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }}
  />
);

const WorkoutProgressPost = ({ searchTerm = '' }: { searchTerm?: string }) => (
  <BasePost
    username="Michael Chen"
    timeAgo="4 hours ago"
    content="Week 8 Progress Update! 📈\nFinally mastered the muscle-up! Started from zero 2 months ago, and now I can do 3 clean reps. Consistency is key! #CalisthenicsJourney"
    imageUrl="https://images.unsplash.com/photo-1599058917765-a780eda07a3e"
    initialLikes={89}
    initialComments={23}
    initialBookmarks={15}
    initialShares={8}
    searchTerm={searchTerm}
    postType="daily"
    onShare={async () => {
      try {
        await Share.share({
          message: "Week 8 Progress Update! 📈\nFinally mastered the muscle-up! Started from zero 2 months ago, and now I can do 3 clean reps. Consistency is key! #CalisthenicsJourney",
          title: 'Workout Progress - Calisthenics Explorer'
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }}
  />
);

const EventAnnouncementPost = ({ searchTerm = '' }: { searchTerm?: string }) => (
  <BasePost
    username="Calisthenics Explorer"
    timeAgo="5 hours ago"
    content="🎉 BIG ANNOUNCEMENT! 🎉\nWe're hosting our first Calisthenics Meetup in Amsterdam! Join us for a day of training, workshops, and community building. All skill levels welcome!\n\n📅 Date: June 15, 2024\n📍 Location: Amsterdam Central Park\n⏰ Time: 10:00 AM - 4:00 PM\n\nEarly bird tickets available now! Link in bio."
    initialLikes={234}
    initialComments={67}
    initialBookmarks={89}
    initialShares={45}
    searchTerm={searchTerm}
    postType="achievement"
    onShare={async () => {
      try {
        await Share.share({
          message: "🎉 BIG ANNOUNCEMENT! 🎉\nWe're hosting our first Calisthenics Meetup in Amsterdam! Join us for a day of training, workshops, and community building. All skill levels welcome!\n\n📅 Date: June 15, 2024\n📍 Location: Amsterdam Central Park\n⏰ Time: 10:00 AM - 4:00 PM\n\nEarly bird tickets available now! Link in bio.",
          title: 'Event Announcement - Calisthenics Explorer'
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }}
  />
);

const NutritionTipPost = ({ searchTerm = '' }: { searchTerm?: string }) => (
  <BasePost
    username="Calisthenics Explorer"
    timeAgo="6 hours ago"
    content="🥗 Nutrition Tip of the Day! 🥗\n\nDid you know? Proper nutrition is crucial for calisthenics progress! Here are 3 key points:\n\n1. Protein: Aim for 1.6-2.2g per kg of body weight\n2. Carbs: Essential for energy during workouts\n3. Hydration: Drink water before, during, and after training\n\nWhat's your favorite pre-workout meal? Share below! 👇"
    imageUrl="https://images.unsplash.com/photo-1490645935967-10de6ba17061"
    initialLikes={178}
    initialComments={42}
    initialBookmarks={67}
    initialShares={34}
    searchTerm={searchTerm}
    postType="daily"
    onShare={async () => {
      try {
        await Share.share({
          message: "🥗 Nutrition Tip of the Day! 🥗\n\nDid you know? Proper nutrition is crucial for calisthenics progress! Here are 3 key points:\n\n1. Protein: Aim for 1.6-2.2g per kg of body weight\n2. Carbs: Essential for energy during workouts\n3. Hydration: Drink water before, during, and after training\n\nWhat's your favorite pre-workout meal? Share below! 👇",
          title: 'Nutrition Tip - Calisthenics Explorer'
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }}
  />
);

export default function CommunityScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    setIsSearching(text.length > 0);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      <View style={styles.headerContainer}>
        <Image 
          source={{ uri: 'https://i.pravatar.cc/150' }} 
          style={styles.profileImage} 
        />
        
        <View style={[styles.searchContainer, isSearching && styles.searchContainerActive]}>
          <Ionicons name="search" size={20} color={isSearching ? "#1BA7EB" : "#666"} style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#666"
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchTerm ? (
            <TouchableOpacity 
              onPress={() => {
                setSearchTerm('');
                setIsSearching(false);
              }}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity 
          style={styles.chatButton}
          onPress={() => setShowChatModal(true)}
        >
          <Ionicons name="chatbubble-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={['#1BA7EB', '#8EE0FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.contentContainer}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.postSpacing} />
          <Post searchTerm={searchTerm} />
          <View style={styles.postSpacing} />
          <DailyTaskPost searchTerm={searchTerm} />
          <View style={styles.postSpacing} />
          <AchievementPost searchTerm={searchTerm} />
          <View style={styles.postSpacing} />
          <ParkHighlightPost searchTerm={searchTerm} />
          <View style={styles.postSpacing} />
          <WorkoutProgressPost searchTerm={searchTerm} />
          <View style={styles.postSpacing} />
          <EventAnnouncementPost searchTerm={searchTerm} />
          <View style={styles.postSpacing} />
          <NutritionTipPost searchTerm={searchTerm} />
          <View style={styles.postSpacing} />
        </ScrollView>
      </LinearGradient>

      {/* iOS Style Alert Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showChatModal}
        onRequestClose={() => setShowChatModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.iosAlertContainer}>
            <View style={styles.iosAlertContent}>
              <Text style={styles.iosAlertTitle}>Page Doesn't Exist</Text>
              <View style={styles.iosAlertDivider} />
              <TouchableOpacity 
                style={styles.iosAlertButton}
                onPress={() => setShowChatModal(false)}
              >
                <Text style={styles.iosAlertButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: Platform.OS === 'ios' ? 44 : 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
  },
  postSpacing: {
    height: 16,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 18,
    paddingHorizontal: 12,
    height: 36,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    paddingVertical: 0,
    height: 36,
  },
  chatButton: {
    marginLeft: 12,
    padding: 4,
  },
  // Post Styles
  postContainer: {
    backgroundColor: '#fff',
    width: '100%',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  postContentContainer: {
    paddingLeft: 64,
    paddingRight: 16,
  },
  postProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postHeaderInfo: {
    marginLeft: 12,
  },
  postUsername: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  postText: {
    fontSize: 15,
    lineHeight: 20,
    paddingBottom: 12,
    color: '#000',
  },
  moreText: {
    color: '#1BA7EB',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: Dimensions.get('window').width * 0.5625,
    marginBottom: -8,
    borderRadius: 8,
  },
  interactionContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionCount: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  likedCount: {
    color: '#ff3b30',
  },
  bookmarkedCount: {
    color: '#007AFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
    zIndex: 1000,
  },
  commentsList: {
    flex: 1,
  },
  commentsListContent: {
    paddingBottom: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  commentUsername: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentTime: {
    color: '#666',
    fontSize: 12,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: 'row',
    gap: 16,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentActionText: {
    color: '#666',
    fontSize: 12,
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
    minHeight: 56,
    position: 'relative',
    bottom: 0,
    marginBottom: 20,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
    minHeight: 36,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  repliesContainer: {
    marginTop: 8,
    marginLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
    paddingLeft: 12,
  },
  replyContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  replyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  replyContent: {
    flex: 1,
  },
  replyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  replyUsername: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  replyTime: {
    color: '#666',
    fontSize: 11,
  },
  replyText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  replyActions: {
    flexDirection: 'row',
    gap: 12,
  },
  replyAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  replyActionText: {
    color: '#666',
    fontSize: 11,
  },
  replyInputContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 12,
    alignItems: 'center',
  },
  replyInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    fontSize: 13,
    maxHeight: 80,
  },
  taskList: {
    marginTop: 12,
    marginBottom: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskCheck: {
    fontSize: 16,
    marginRight: 8,
  },
  taskText: {
    fontSize: 15,
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  clearButton: {
    padding: 4,
  },
  searchContainerActive: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1BA7EB',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iosAlertContainer: {
    width: '80%',
    maxWidth: 270,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 13,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iosAlertContent: {
    padding: 20,
  },
  iosAlertTitle: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    marginBottom: 8,
  },
  iosAlertDivider: {
    height: 1,
    backgroundColor: '#C7C7CC',
    marginVertical: 8,
  },
  iosAlertButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  iosAlertButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#007AFF',
  },
});
