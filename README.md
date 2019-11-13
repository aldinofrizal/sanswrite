## MINI-WP | Sanswrite!

#### API Documentation



#### 1. Register User

#### POST /user/register

> this call  need username(string), email(string and email format), and password(string) field as a body input.

success response :

```
{
  "_id": "5da29eeebdb4e0165000927f",
  "username": "rocket",
  "email": "rocket@gmail.com",
  "password": "$2b$10$k1TwfNFzXmFN9mJLOAhe1..2/hOFWSwuReeek8PJ67JAHUns8R2yi",
  "__v": 0
}
```

fail response : 

```
{
  "msg": [
    "username must not empty",
    "Please fill a valid email address"
  ]
}
```



#### 2. Login User

#### POST /user/login

> require a body input which contain an email and password

success response ( token and payload(contain user data))

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDlkOWQxNzMwZjIxYTRkNWNiYTg0MWIiLCJlbWFpbCI6Imtvc2FzaWhAZ21haWwuY29tIiwidXNlcm5hbWUiOiJrb3Nhc2loIiwiaWF0IjoxNTcwOTM4NzQ1fQ.1QZOHLd8MUKYSdP8tonadO3T2chcrS0MMRCIv65TF0Q",
  "payload": {
    "_id": "5d9d9d1730f21a4d5cba841b",
    "email": "kosasih@gmail.com",
    "username": "kosasih"
  }
}
```

fail response :

```
{
  "message": "wrong email/password"
}
```





#### 3. Get logged user article 

##### GET /article/search

this call will generate logged user articles dynamically depend on a body input field named search, by default search is an empty string, so this call will generate all logged user articles

> require token and search(string[, optional]) as a headers

response : 

```
[
  {
    "tags": [
      " music,artist",
      "art "
    ],
    "_id": "5da1a01d0ab36548c60894ca",
    "title": "Hindia #2",
    "content": "<p>&ldquo;Untu... berjalannya.</p>\n",
    "image": "https://storage.googleapis.com/solution.aldinofrizal.xyz/1570873342835586119936.jpeg",
    "UserId": "5d9d9d1730f21a4d5cba841b",
    "createdAt": "2019-10-12T09:42:53.908Z",
    "updatedAt": "2019-10-12T09:42:53.908Z",
    "__v": 0
  },
  {
    "tags": [
      "nature",
      "demo "
    ],
    "_id": "5da299120095481326819f9a",
    "title": "Alone",
    "content": "<p>There&rsq.........o;t it?</p>\n",
    "image": "https://storage.googleapis.com/solution.aldinofrizal.xyz/1570937100582view-wallpaper_6015079.jpg",
    "UserId": "5d9d9d1730f21a4d5cba841b",
    "createdAt": "2019-10-13T03:25:06.022Z",
    "updatedAt": "2019-10-13T03:25:06.022Z",
    "__v": 0
  }
]
```

fail response : 

```
{
  "name": "AuthenticationError"
}
```



#### 4. Create Article

#### POST /article

require a body contains title(string), tags(array), content(string, html tag formatted), and image file(jpg,png,and all image file format)

also require a token as headers

success response 

```
{ tags: [ 'music', 'paramore', 'hayley ' ],
  _id: 5da2aab9ca3868208b2d8b23,
  title: 'Hayley',
  content:
   '<p>The singer&nbsp;<a href="https://www.nme.com/news/music/hayley-williams-personal-essay-mental-health-2329262">previously shared a powerful personal essay on the topic</a>, detailing the pressures that come with social acceptance and &lsquo;fittin..Just threw up a little bit,&rdquo; she begins.</p>\n',
  image:
   'https://storage.googleapis.com/solution.aldinofrizal.xyz/1570941604048hayley-williams-mental-health-either-or-situation-920x584.jpg',
  UserId: 5d9d9d1730f21a4d5cba841b,
  createdAt: 2019-10-13T04:40:25.380Z,
  updatedAt: 2019-10-13T04:40:25.380Z,
  __v: 0 }

```

fail response

```
{
	message : ['all fields are required']
}
or
{
	message : 'authentication failed'
}
```



#### 5. Patch an article

#### PATCH /article/patch

require a whole document field except UserId and _id, title(string), content(string, and html formatted), tags(array), image file(file[, optional])

also require a token as a headers input

success response 

```
{
	message: 'successfully patch file'
}
```

 fail response

```
{
	message : 'authentication failed'
}
```



#### 6. Delete an article

require an article id as a body input field, and token as a headers

success response

```
{
	message : 'successfuly deleted article'
}
```

fail response

```
{
  "message": "Cannot find data to proccess"
}
or
{
  "name": "AuthenticationError"
}
```

