# Overview

APIs Yemusic...

## Youtube API

### Get List

- Route: `api/us/song/s`
- Method: `POST`
- Input
  - `Body`
  
  ```ts
  {
    search: string,
    apiKey?: string,
    token?: string,
  }
  ```

- Responses
  
  ```ts
    {
      success: boolean,
      data: {
        songs: [{
          yId: string,
          thumbnail: {
            url: string,
            width: number,
            height: number,
          },
          duration: string,
          title: string,
          channel: string,
          view: string,
          publishedAt: string,
        }],
        token: string,
        apiKey: string,
      }
    }
  ```

- Issues: #17

### Get Trending

- Route: `api/song/trending`
- Method: `POST`
- Input
  - `Body`

  ```ts
   {
    hl: string,
    gl: string,
   }
  ```

- Responses
  
  ```ts
    {
      success: boolean,
      data: {
        songs: [{
          yId: string,
          thumbnail: {
            url: string,
            width: number,
            height: number,
          },
          duration: string,
          title: string,
          channel: string,
          view: string,
          publishedAt: string,
        }]
      }
    }
  ```

- Issues: #31

### Get Audio

- Route: `api/song/:yId`
- Method: `GET`
- Responses

  ```ts
  {
    success: boolean,
    data: {
      audioUrl: string,
    }
  }
  ```

- Issues: #17

### Download Audio

- Route: `api/song/:yId/download`
- Method: `GET`

- Issues: #137

## User API

### Sign-Up API

- Route: `api/user/sign-up`
- Method: `POST`
- Input
  - Body

  ```ts
  {
    email: string,
    password: string,
    displayName: string,
  }
  ```

- Responses

  ```ts
  {
    success: boolean,
    error: {
      message: string,
    }
    data: {
      me: {
        id: string,
        email: string,
        displayName: string,
        isValidEmail: boolean,
        isBlocked: boolean,
        createdAt: date,
        updatedAt: date
      },
      token: string,
    }
  }
  ```
