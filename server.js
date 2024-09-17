<script>
    // Replace 'https://your-backend-service.onrender.com' with your actual Render URL
    const backendURL = 'https://your-backend-service.onrender.com';

    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch(`${backendURL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data.success) {
                // Hide login form and show code form
                document.getElementById('loginForm').classList.add('hidden');
                document.getElementById('codeForm').classList.remove('hidden');
            } else {
                alert('Login failed. Please try again.');
            }
        })
        .catch((error) => console.error('Error:', error));
    });

    document.getElementById('codeForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const code = document.getElementById('code').value;

        fetch(`${backendURL}/api/verify-code`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data.success) {
                alert('Code verified successfully!');
            } else {
                alert('Invalid code. Please try again.');
            }
        })
        .catch((error) => console.error('Error:', error));
    });
</script>
