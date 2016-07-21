function login(callback){
  let wdRef = new Wilddog('https://witcher3.wilddogio.com');

  wdRef.authAnonymously((err, auth)=> {

    setTimeout(()=>{
      callback(err, auth);
    }, 10);
  });

  return wdRef;
}

export default login;