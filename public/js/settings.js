document.addEventListener('DOMContentLoaded', () => {
    const avatarSelectionContainer = document.getElementById('avatar-selection-container');
    const saveAvatarButton = document.getElementById('save-avatar-button');
    const avatarStatusMessage = document.getElementById('avatar-status-message');
    let selectedAvatarId = null;

    // Placeholder for CSS styling for .selected-avatar
    // Suggested CSS:
    // .selected-avatar {
    //     border: 2px solid blue; /* Or box-shadow, outline, etc. */
    //     border-radius: 5px; /* Optional */
    // }
    // img.avatar-image { /* Add a common class to images if you want more specific styling */
    //    width: 50px; /* Example size */
    //    height: 50px; /* Example size */
    //    margin: 5px;
    //    cursor: pointer;
    // }

    if (avatarSelectionContainer) {
        for (let i = 1; i <= 30; i++) {
            const img = document.createElement('img');
            img.src = `assets/3D-Avatars/${i}.svg`;
            img.dataset.avatarId = i;
            img.alt = `Avatar ${i}`;
            img.style.width = '60px'; // Basic styling
            img.style.height = '60px'; // Basic styling
            img.style.margin = '5px';   // Basic styling
            img.style.cursor = 'pointer'; // Basic styling
            // Add a common class for easier styling if desired, e.g., img.classList.add('avatar-image');


            img.addEventListener('click', () => {
                // Remove 'selected-avatar' class from previously selected image
                const previouslySelected = document.querySelector('.selected-avatar');
                if (previouslySelected) {
                    previouslySelected.classList.remove('selected-avatar');
                    // Basic deselection style (remove border)
                    previouslySelected.style.border = 'none';
                }

                // Add 'selected-avatar' class to the clicked image
                img.classList.add('selected-avatar');
                // Basic selection style (add border)
                img.style.border = '2px solid dodgerblue';
                img.style.borderRadius = '5px';

                selectedAvatarId = img.dataset.avatarId;
                avatarStatusMessage.textContent = ''; // Clear status message on new selection
            });
            avatarSelectionContainer.appendChild(img);
        }
    }

    if (saveAvatarButton) {
        saveAvatarButton.addEventListener('click', async () => {
            const nickname = localStorage.getItem('nickname');

            if (!nickname) {
                avatarStatusMessage.textContent = 'Error: Nickname not found. Please log in again.';
                avatarStatusMessage.style.color = 'red';
                return;
            }

            if (!selectedAvatarId) {
                avatarStatusMessage.textContent = 'Please select an avatar first.';
                avatarStatusMessage.style.color = 'red';
                return;
            }

            avatarStatusMessage.textContent = 'Saving...';
            avatarStatusMessage.style.color = 'black';

            try {
                const response = await fetch(`/person/${nickname}/avatar`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ avatarId: selectedAvatarId }),
                });

                if (response.ok) {
                    const updatedPerson = await response.json();
                    avatarStatusMessage.textContent = 'Avatar saved successfully!';
                    avatarStatusMessage.style.color = 'green';
                    // Optionally, update something on the page with updatedPerson data
                } else if (response.status === 404) {
                    avatarStatusMessage.textContent = 'Error: Person not found. Could not save avatar.';
                    avatarStatusMessage.style.color = 'red';
                } else {
                    const errorData = await response.text(); // Try to get more error info
                    avatarStatusMessage.textContent = `Error saving avatar: ${response.status} ${errorData || ''}`;
                    avatarStatusMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Error saving avatar:', error);
                avatarStatusMessage.textContent = 'Network error or server is unreachable. Please try again.';
                avatarStatusMessage.style.color = 'red';
            }
        });
    }
});
