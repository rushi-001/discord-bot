# <p align="center"><img src="./assets/http.png" alt="Bot Logo" width="200" height="200"></p>

# <p align="center">URL Shortener Discord Bot</p>

## Project Description

The URL Shortener Discord Bot allows users to shorten URLs directly from their Discord server. It uses `shortid` to generate short URLs and stores the original URLs along with the generated short URLs and user IDs in a MongoDB database. Built with `discord.js`, `express`, `mongoose`, and `nodemon`.

## Features

-   **`/help`**: Provides information about the bot and lists all available commands.
-   **`/create [url]`**: Generates a short URL for the given URL and stores it in the database.
-   **`/myurls`**: Retrieves and lists all URLs that the user has created, using the stored user ID.

## Dependencies

-   `discord.js` (v14.15.2): A powerful library for interacting with the Discord API.
-   `express` (v4.19.2): A minimal and flexible Node.js web application framework.
-   `mongoose` (v8.4.0): An elegant MongoDB object modeling tool for Node.js.
-   `nodemon` (v3.1.0): A tool that helps develop Node.js based applications by automatically restarting the node application when file changes are detected.
-   `shortid` (v2.2.16): A tiny URL-friendly unique ID generator.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/url-shortener-discord-bot.git
    cd url-shortener-discord-bot
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables: (This is IMPORTANT)**
   Create a `.env` file in the root directory and add the following:

    ```env
    BotToken=your_discord_bot_token
    MongoDB_URL=your_mongodb_uri
    ```

4. **Start the bot:**
    ```bash
    nodemon index.js
    ```

## Usage

1. **Invite the bot to your Discord server.**
2. **Use the following commands:**

    - **Commands:**

        ![Commands](./assets/commands.png)

    - **/help**: Lists all available commands and their descriptions.

        ![Help Command](./assets/help.png)

    - **/create [url]**: Shortens the provided URL and returns the shortened version.

        ![Create Command](./assets/create.png)

        ![Short URL](./assets/short%20url.png)

    - **/myurls**: Displays all URLs that you have shortened.

        - If no URLs are created or found in the database:

            ![No URLs Found](./assets/myurls%20if%20no%20urls%20created.png)

        - If URLs are found in the database:

            ![My URLs](./assets/myurls.png)

## Commands Overview

| Command         | Description                                                |
| --------------- | ---------------------------------------------------------- |
| `/help`         | Provides information about the bot and lists all commands. |
| `/create [url]` | Generates a short URL for the given URL.                   |
| `/myurls`       | Retrieves and lists all URLs created by the user.          |

## Contributing

1. **Fork the repository.**
2. **Create a new branch for your feature or bug fix:**
    ```bash
    git checkout -b feature-name
    ```
3. **Commit your changes:**
    ```bash
    git commit -m "Add some feature"
    ```
4. **Push to the branch:**
    ```bash
    git push origin feature-name
    ```
5. **Create a new Pull Request.**

## License

This project is licensed under the MIT License.
