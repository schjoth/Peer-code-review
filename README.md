# Peer Code Review

Peer Code Review is an application which enables bi-directional anonymous Pull Request Reviews.
This means that the identity for both the author and reviewer is hidden from eachother.
It integrates directly into your GitHub Organization, by posting all the feedback on your Pull Requests.

## Example
![image](https://github.com/schjoth/Peer-code-review/assets/27954138/68751123-c7cd-4035-a9f7-7d343db0c3b9)



## Identifying reviewers
As seen in the screenshot above, every comment is signed with a UUID.
Peer Code Review also allows the lookup the identity of the reviewer with this UUID, however one has to add some authorization to prevent everyone from being able to look it up.
