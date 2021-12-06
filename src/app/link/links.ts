
// link to heruko : https://banks-furienn-app.herokuapp.com/


export const links = {
  usersLink:
  {
    register:'http://localhost:3080/api/user/signup',
    login:'http://localhost:3080/api/user/login',
    reset:'http://localhost:3080/api/user/reset-password',
    updateData:'http://localhost:3080/api/user/update-data',
    updatePassword:'http://localhost:3080/api/user/update-password/'
  } ,
  publicPost :
  {
    commented:'http://localhost:3080/api/public-poster/comment-poster/',
    allComment:'http://localhost:3080/api/public-poster/current-comment-poste/',
    lovePost:'http://localhost:3080/api/public-poster/loved-poster/',
    allPost:'http://localhost:3080/api/public-poster/all-poster/',
    publicPost:'http://localhost:3080/api/public-poster/members-poster/',
    privatePost:'http://localhost:3080/api/public-poster/user-poster/',
  } ,
  privatePost :
  {
    post : 'http://localhost:3080/api/poster/all-post/',
    create:'http://localhost:3080/api/poster/save-post',
    onPost:'http://localhost:3080/api/poster/getOnPost/',
  } ,
  allLink:
  {
    delete : 'http://localhost:3080/api/poster/deleted/',
    update:'http://localhost:3080/api/poster/update-post/',
  }
};

// heroku { email : deve , mdp : Bankfurien@$56bank}

