import React from 'react';

export const getName = (id, users, userName) => {
	// get name from projectUsers (as users)
	const result = users.find((user) => {
		return user.id === id;
	});
	// change username to 'You' and add blue color
	if (result.username === userName) {
		return (
			<div className="text-info">
				<strong>You</strong>
			</div>
		);
	} else {
		return (
			<div>
				<strong>{result.username}</strong>
			</div>
		);
	}
};
