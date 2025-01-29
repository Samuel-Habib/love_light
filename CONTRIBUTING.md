# Contributing to Partner Light

Thank you for considering contributing to Love Light formerly Partner Light! We welcome contributions from everyone. Below are some guidelines to help you get started.

## How to Contribute

1. **Fork the repository**: Click the "Fork" button at the top right of the repository page.
2. **Clone your fork**: 
    ```sh
    git clone https://github.com/your-username/partner_light.git
    ```
3. **Create a branch**: 
    ```sh
    git checkout -b your-branch-name
    ```
4. **Create a .env file** with the following variables:
    ```
    MONGO_URI 
    GOOGLE_API_KEY
    GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET
    RESEND_API_KEY
    JWT_SECRET // this can be anything
    CLIENT_URL = "localhost:3000"
    EMAIL = "samuel.15.fahim@gmail.com"
    SESSION_SECRET // this can be anything
    CALLBACK_URL = http://localhost:3000/auth/google/callback 
    ```
5. **Make your changes**: Implement your feature or bug fix.
6. **Commit your changes**: 
    ```sh
    git commit -m "Description of your changes"
    ```
7. **Push to your fork**: 
    ```sh
    git push origin your-branch-name
    ```

### Submitting a Pull Request
1. Create a new branch:
   ```
   git checkout -b branch-name
   ```
2. Make your changes and commit them.
3. Push your branch and create a pull request to `main`.
4. Wait for a maintainer to review your PR.


## Code Style

- Follow the existing code style.
- Write clear and concise commit messages.
- Include comments where necessary.

## Reporting Issues

Please use the following format when submitting an issue:
- **Describe the bug or feature request.**
- **Steps to reproduce (if applicable).**
- **Expected behavior.**
- **Screenshots/logs (if applicable).**


## Code of Conduct

Please follow all of the guidelines for contributing listed [here](https://www.contributor-covenant.org/). 

Thank you for your support!