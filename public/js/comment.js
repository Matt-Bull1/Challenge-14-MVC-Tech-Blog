const commentFormHandler = async (event) => {

    event.preventDefault();

    const comment = document.querySelector('#post-comment').value.trim();
    const post_id = window.location.pathname.split('/').pop();
    
    if (comment) {
        const response = await fetch(`/api/comments/${post_id}`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace(`/comments/${post_id}`);
        } else {
            alert('Failed to create comment');
            console.log(err);
        }
    } else {
        alert('Enter a comment')
    }

};

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);