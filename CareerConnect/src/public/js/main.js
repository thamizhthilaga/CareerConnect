// Dropdown menu toggle
function toggleDropdown() {
  const dropdown = document.getElementById('dropdown');
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'none' || dropdown.style.display === '' ? 'block' : 'none';
  }
}

// Save job
async function saveJob(jobId) {
  try {
    const response = await fetch('/jobs/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobId }),
    });

    if (response.ok) {
      location.reload();
    }
  } catch (error) {
    console.error('Error saving job:', error);
    alert('Failed to save job');
  }
}

// Delete resume
async function deleteResume(resumeId) {
  if (confirm('Are you sure you want to delete this resume?')) {
    try {
      const response = await fetch(`/resume/delete/${resumeId}`, {
        method: 'POST',
      });

      if (response.ok) {
        location.reload();
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
      alert('Failed to delete resume');
    }
  }
}

// Filter forum posts
function filterForum(career) {
  if (career) {
    window.location.href = `/community?career=${encodeURIComponent(career)}`;
  } else {
    window.location.href = '/community';
  }
}

// Delete post
async function deletePost(postId) {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      const response = await fetch(`/community/post/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.href = '/community';
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  }
}

// Fetch notifications
async function loadNotifications() {
  try {
    const response = await fetch('/community/notifications');
    const notifications = await response.json();
    updateNotificationUI(notifications);
  } catch (error) {
    console.error('Error loading notifications:', error);
  }
}

// Mark notification as read
async function markNotificationRead(notificationId) {
  try {
    await fetch(`/community/notifications/${notificationId}/read`, {
      method: 'POST',
    });
    loadNotifications();
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
}

// Update notification UI (placeholder)
function updateNotificationUI(notifications) {
  console.log('Notifications:', notifications);
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('dropdown');
  const userBtn = document.querySelector('.user-btn');
  if (dropdown && !dropdown.contains(e.target) && !userBtn?.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

// Load notifications on page load
document.addEventListener('DOMContentLoaded', () => {
  // Placeholder for future functionality
  console.log('CareerConnect loaded');
});
