function login() {
    var _email;
    $('button#complete').click(function(event) {
        event.preventDefault();
        firebase.firestore().collection('users').get().then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.data().nickname == $('#id').val().replace(/ /g, "")) {
                    _email = childSnapshot.data().email;
                }
            })
        }).then(function() {
            if (!_email) {
                $('#id').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                $('#pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                $('#id').val('');
                $('#pswd').val('');
            } else {
                console.log(_email)
                firebase.auth().signInWithEmailAndPassword(_email, $('#pswd').val()).then(function() {
                    if(!firebase.auth().currentUser.emailVerified){
                        alert('발송된 이메일을 인증해주세요');
                        firebase.auth().singOut();
                    }else{
                        if (location.href.startsWith('https://franknoh.github.io/login?redirect=')) {
                            location.href = location.href.substring('https://franknoh.github.io/login?redirect='.length); //로그인 후 이동
                        } else {
                            location.href = 'https://franknoh.github.io/'; //로그인 후 이동
                        }
                    }
                }).catch(function(error) {
                    console.log(error);
                    $('#id').css('box-shadow', '0rem 0rem 0.9rem 0rem #d1d1d1');
                    $('#pswd').css('box-shadow', '0rem 0rem 0.9rem 0rem #ff0088');
                    $('#id').val('');
                    $('#pswd').val('');
                });
            }
        });
    });
}
$(function() {
    firebase.auth().onAuthStateChanged(user => {
        if (!!user) {
            if (location.href.startsWith('https://franknoh.github.io/login?redirect=')) {
                location.href = location.href.substring('https://franknoh.github.io/login?redirect='.length); //로그인 후 이동
            } else {
                location.href = 'https://franknoh.github.io/'; //로그인 후 이동
            }
        } else {
            login();
        }
    });
});
