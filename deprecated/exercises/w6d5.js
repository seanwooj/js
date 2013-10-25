// AJAX

// 1. Given the following Ruby controller and JS function, what would the pathname
//    that you would you use to make a get request with the ajax call?

// 2. What will the data argument consist of in the ajax method's callback function?

// 3. Why can't we count on the call to printUsers to actually print the user
//    data the way it's being executed right now?

// class UsersController
//  def index
//     @users = User.all
//
//     respond_with do |format|
//       format.json { render :json => @users }
//     end
//  end
// end

var users;

$.getJSON(path, function(data) {
  users = data;
});

function printUsers(arr) {
  for (var i=0; i<arr.length; i++) {
    console.log(arr[i]);
  }
}

printUsers(users);