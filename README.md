
# A04 CS426 [Movie Recommendations]

3rd Party APIs Used: 
- TheMovieDB API aka TMDB API
- MediaWiki (Wikipedia) API

#### Confession before we start: 

I have committed a cardinal programmer sin and left API key(s) intact so that its one less step to preview [though there are screenshots below]. 

#### Description: 

Loads into a page with Recommendation categories in a Nav bar on left, auto-populates with popular movies. You can choose a genre to get its recommended movies. 

You can click on any movie poster to go to its page where the poster is shown on the left and the movie trailer on the top right with a list of its actors below the trailer. 

Clicking on any actor name will take you to their wikipedia page, if its available.




#### For TMDB API: 
Function `fetchMovieDetails(movieId)` is used to fetch movie details from TMDB API by sending a GET request to the following URL: `https://api.themoviedb.org/3/movie/${movieId}`.

TMDB API is to fetch recommended movies based on genre and also to gather information about the movie cast (actors). This information is used to display movie details, recommended movies, and cast members on the pages.

#### For MediaWiki(Wikipedia) API
MediaWiki (Wikipedia) API: This is used to search for a page on Wikipedia based on the name of an actor. If a page is found, the URL for that Wikipedia page is created.

Function `fetchActorWikiPage(actorName)` is used to search for an actor’s Wikipedia page by sending a GET request to 'https://en.wikipedia.org/w/api.php' and passing URLSearchParameters in the format `'action': 'query', 'list': 'search', 'srsearch': actorName, 'format': 'json', 'origin': '*'`.

The search results are then parsed to extract the first match (assuming the most relevant result is the first one), construct a URL to that Wikipedia page and return it. This Wikipedia URL is then added to the anchor element (`<a>`) for each actor, which is then clickable and opens the actor's Wikipedia page on click.


## API Reference

#### Fetch Movie details

```http
  GET /3/movie/${movieId}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `language` | `string` | Language parameter to get data in desired language |
| `language` | `string` | Allows to add more data in the response (e.g. images, credits) |

#### Fetch Actor Wikipedia page details

```http
  GET /w/api.php
```


| Parameter  | Type   | Description                               |
| :--------- | :----- | :---------------------------------------- |
| `action`     | `string` | **Required**. Type of action to be performed |
| `list`       | `string` | Decides the type of list                  |
| `srsearch`   | `string` | Name of the actor                         |
| `format`     | `string` | Structure format of the response           |
| `origin`     | `string` | Ensures CORS support                      |

#### fetchActorWikiPage(actorName)

Takes the actor's name and returns the Wikipedia link of the actor's page.

#### Documentation for API: 
 - https://developer.themoviedb.org/docs/authentication-application
 - https://www.mediawiki.org/wiki/API:Main_page
## Screenshots

##### Home
![Home](/Screenshots/Home.png "Home")
##### Horror-Genre Recommendations
![Horror Recommendations](/Screenshots/Horror_Recommendations.png "Horror Recommendations")
##### Movie Details Page
![Movie Page](/Screenshots/Movie_Page.png "Movie Page")
##### Linked Wikipedia Actor Page
![Linked Wikipedia](/Screenshots/Linked_Wikipedia.png "Linked_Wikipedia")

