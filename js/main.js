$(document).ready(function() {
   $('#searchUser').on('keyup', function(e) {
    let username = e.target.value;

    // Make request to github
    $.ajax({
    	url:`https://api.github.com/users/${username}`,
    	data:{
    		client_id:'03ee0a6cb8863b925aa5',
    		client_secret:'1f7c17a03c74dad058e7f58e3f7652d171e2a8c0'
    	}
    }).done(function(user) {
    	$('#profile').html(`

    		<div class='card card-default'>
    			<div class='card-header'>
    				<h3 class='card-title'>${user.name}</h3>
    			</div>
    			<div class='card-body'>
    				<div class='row'>

    					<div class='col-md-4'>
    						<img class='thumbnail' style='width=100%' src='${user.avatar_url}'>
    						<a target='_blank' class="btn btn-primary btn-block" href='${user.html_url}'>Github profile</a>
    					</div>

    					<div class='col-md-6 ml-auto'>
    					<span class='badge badge-primary'>Public Repos: ${user.public_repos}</span>
    					<span class='badge badge-secondary'>Public Gists: ${user.public_gists}</span>
    					<span class='badge badge-success'>Followers: ${user.followers}</span>
    					<span class='badge badge-success'>Following: ${user.following}</span>
    					
    					</div>
    				</div>
    			</div>
    		</div>

    		`)
    });
    
   }) 
});