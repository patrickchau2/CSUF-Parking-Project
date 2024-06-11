// client.js

// Profile section functionality

// Get the profile section elements
const profileSection = document.querySelector('.profile-section');
const usernameElement = document.getElementById('username');
const editProfileButton = document.getElementById('edit-profile-button');
const changePasswordButton = document.getElementById('change-password-button');
const logoutButton = document.getElementById('logout-button');

// Set the username element value
usernameElement.textContent = localStorage.getItem('username') || 'Guest';

// Handle the edit profile button click event
editProfileButton.addEventListener('click', () => {
  // Redirect the user to the edit profile page
  window.location.href = '/edit-profile.html';
});

// Handle the change password button click event
changePasswordButton.addEventListener('click', () => {
  // Redirect the user to the change password page
  window.location.href = '/change-password.html';
});

// Handle the logout button click event
logoutButton.addEventListener('click', () => {
  // Clear the user's session data
  localStorage.removeItem('username');
  localStorage.removeItem('token');

  // Redirect the user to the login page
  window.location.href = '/login.html';
});