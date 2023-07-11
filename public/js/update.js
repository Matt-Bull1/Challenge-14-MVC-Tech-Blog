const deletePostFormHandler = async (event) => {

    event.preventDefault();

    const post_id = window.location.pathname.split("/").pop();

    try {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
            console.log(err);
        }
    } catch (error) {
        console.log(err);
    }

};

const updatePostFormHandler = async (event) => {

    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    const post_id = window.location.pathname.split("/").pop();

    if (title && content) {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post');
            console.log(err);
        }
    } else {
        alert('Your post needs both a title and content')
    }

};

document
    .querySelector('.update-btn')
    .addEventListener('click', updatePostFormHandler);

document
    .querySelector('.delete-btn')
    .addEventListener('click', deletePostFormHandler);