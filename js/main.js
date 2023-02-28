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
		$.ajax({
			url:`https://api.github.com/users/${username}/repos`,
			data:{
				client_id:'03ee0a6cb8863b925aa5',
				client_secret:'1f7c17a03c74dad058e7f58e3f7652d171e2a8c0',
				sort: 'created: asc',
				per_page: 5
			}
		}).done(function(repos) {
			$.each(repos, function(index, repo) {
				$('#repos').append(`
					<div class="well">
						<div class="row">
							<div class="col-md-7">
								<strong>${repo.name}</strong>: ${repo.description}
							</div>

							<div class="col-md-3">
								<span class='badge badge-primary'>Forks: ${repo.forks_count}</span>
								<span class='badge badge-secondary'>Watchers: ${repo.watchers_count}</span>
								<span class='badge badge-success'>Stars: ${repo.stargazers_count}</span>
							</div>

							<div class="col-md-2">
								<a href="${repo.html_url}" target="_blank" class="btn btn-primary">Repo page</a>
							</div>
						</div>
					</div>
				`)
			});
		});
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
    					<br></br>
						<ul class="list-group">
							<li class="list-group-item">Company: ${user.company}</li>
							<li class="list-group-item">Website / Blog: ${user.blog}</li>
							<li class="list-group-item">Location: ${user.location}</li>
							<li class="list-group-item">Member since: ${user.created_at}</li>
						</ul>
    					</div>
    				</div>
    			</div>
    		</div>
			<h3 class="page-header">latest repos</h3>
			<div id="repos"></div>
    		`)
    });
    
   }) 
});