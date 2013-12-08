# Angular Carousel #
 
Carousel in AngularJS

### Application Stack ######

- [Node.js](http://www.nodejs.org)

- [Express](http://www.expressjs.com/)

- [Jade](http://jade-lang.com/)

- [Angular 1.2.4](http://angularjs.org/)

- [jQuery 1.10.2](jquery.com)

- [Bootstrap 3](http://getbootstrap.com/)

### Node Dependencies ######

    cd server
    npm install

### Launch ######

    # in server/
    node server.js

### Angular Dependencies ######
    
    [ngSanitize](https://ajax.googleapis.com/ajax/libs/angularjs/1.2.4/angular-sanitize.min.js)
    https://ajax.googleapis.com/ajax/libs/angularjs/1.2.4/angular-sanitize.min.js 

### Carousel Usage ######
  
    <div sl-carousel sl-carousel-items="app.items"></div>

### Item Model ######
    
    {
      title: 'Test',
      imgSrc: 'test.png',
      description: 'This is a test'
    } 

