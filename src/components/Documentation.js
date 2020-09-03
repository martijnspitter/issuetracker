import React, { Component } from 'react';

import { Container, Card } from 'react-bootstrap';

export default class Documentation extends Component {
	render() {
		return (
			<Container style={{ display: 'flex', justifyContent: 'center' }}>
				<Card style={{ width: '100%' }}>
					<Card.Header className="text-white bg-dark" style={{ justifyContent: 'center' }}>
						IssueTracker Documentation
					</Card.Header>
					<Card.Body style={{ padding: '2rem 4rem' }}>
						<div>
							<h2 id="nmt">Introduction</h2>
							<h4>Welcome on the IssueTracker!</h4>
							<p>
								This IssueTracker was created to fill up my portfolio and to learn more about React, JS, Redux,
								Bootstrap, NodeJS (with Express and Sequelize) and MySQL. And learn a lot I did! I am happy with the
								result and I hope you are too!
							</p>
							<h4> Feel free to use this IssueTracker on your own Projects!</h4>
							<h4>Greeting Martijn </h4>
						</div>

						<div>
							<h2>Need to Know</h2>
							<h4>Users</h4>
							<p>
								Users are all in one group. That is to say that there are no layers between the users. Every user
								registerd to the IssueTracker can be added to a project and then assigned an issue. I dont expect a lot
								of traffic on this IssueTracker but if it becomes apparant that more people are using this I might add
								it.
							</p>
							<h4>IssueTracker Project</h4>
							<p>
								Every user is added to the IssueTracker Project. If you find an issue with the IssueTracker please make
								an issue and I will fix it.
							</p>
							<h4>Update interval</h4>
							<p>
								Issues and comments are automatically retrieved from the server every 5 minutes. And ofcourse on a page
								reload.
							</p>
						</div>

						<div>
							<h2>Getting Started</h2>
							<h4>Register</h4>
							<p>
								Only a username, password an emailadress are needed to register. The password is encrypted using bcrypt.
							</p>

							<h4>Login</h4>
							<p>
								Upon login the browser receives a token from the server and your username and id. This is saved in the
								localstorage of the browser. A copy of the Redux state is also stored in the localstorage. Both are
								deleted upon logout.
							</p>

							<h4>IssueTracker Project</h4>
							<p>
								Each new user is automatically added to the IssueTracker Project. If you find a bug or want additional
								features add an issue to the project.
							</p>

							<h4>Profile page</h4>
							<p>
								Here you can find in how many projects you are involved in and how many issues there are connected to
								those projects. From here you can jump to the projects or read this documentation. You can always return
								to the profile page by clicking on your username in the Navbar --IMG--
							</p>
						</div>

						<div>
							<h2>Projects</h2>
							<h4>Navigation</h4>
							<p>
								You can navigate to the Project using the Navbar or from the profilepage using the 'Go to Projects'
								button.
							</p>

							<h4>New Project</h4>
							<p>
								When you are on the Project page you have access to the 'New Project' link in the Navbar. This opens a
								popup where you can enter the Project details. You will be the owner of this Project with all the
								responsibilities and headaches involved...
							</p>

							<h4>Ownership of a Project</h4>
							<p>
								If you are the creator of a Project you can edit the Project details, add or remove Users to the Project
								and delete the Project. As a creator of a Project you also have the same privileges as an Issue creator
								and Comment creator for all Issues and Comments in your Project. See the Issues and Comments sections
								for more info.
							</p>

							<h4>Selecting Project</h4>
							<p>
								When you select a Project you will be navigated to the IssueList. Here you can find a list of all the
								issues connected to your Project
							</p>
						</div>

						<div>
							<h2>IssueList</h2>
							<h4>Navigation</h4>
							<p>You can navigate to the IssueList by selecting a Project.</p>

							<h4>New Issue</h4>
							<p>
								When you are in the IssueList or looking at a single Issue you have access to the 'New Issue' link in
								the Navbar. This opens a popup where you can enter the Issue details. The issue is always created with a
								status of 'Open'
							</p>

							<h4>IssueList</h4>
							<p>
								The IssueList shows all the Issues connected to your Project. You can easily see the status (open,
								close, on hold), the priority (low, medium, high), the title, to which User the Issue is assigned and
								the amount of comments on the Issue. On hover you get additional info.
							</p>
						</div>

						<div>
							<h2>Issues</h2>
							<h4>Navigation</h4>
							<p>You can navigate to the issue by clicking the title in the IssueList</p>

							<h4>Onership of an Issue</h4>
							<p>
								If you are the creator of an Issue you can edit the Issue details aswell as edit or delete the comments
								same as the Project creator
							</p>

							<h4>Reassign Issue</h4>
							<p>
								As Issue creator you can reassing the Issue to another user connected to the Project. A Project creator
								can do this as well. You can do this by clicking the 'edit issue' button
							</p>

							<h4>Change Status</h4>
							<p>
								As a creator or the assigned user you can change the status of the Issue to 'On Hold', 'Closed' or
								'Open' again. A project creator can do this as well
							</p>

							<h4>Change Priority</h4>
							<p>
								As of yet you can't change the priority. If you want this feature added please add an issue to the
								IssueTracker project
							</p>
						</div>

						<div>
							<h4>Comments</h4>
							<h2>Navigation</h2>
							<p>Comments are shown on the issues. When you navigate to an issue you will see the comments</p>

							<h2>Ownership of the comment</h2>
							<p>
								As owner of a comment you can edit or delete a comment. A issue or project creator can do this as well.
							</p>

							<h2>Rendering of comments</h2>
							<p>
								Your own comments will be shown on the right. Comments of other people will appear on the left side of
								the screen
							</p>
						</div>
					</Card.Body>
				</Card>
			</Container>
		);
	}
}
