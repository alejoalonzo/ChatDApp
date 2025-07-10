//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ChatApp {
    struct user {
        string username;
        friend[] friendList;
    }

    struct friend {
        address pubkey;
        string name;
    }

    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct allUserStruct {
        string name;
        address accountAddress;
    }

    allUserStruct[] getAllUsers;

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    //Check User Existence
    function userExists(address _user) public view returns (bool) {
        return bytes(userList[_user].username).length > 0;
    }

    //Create Account
    function createAccount(string calldata _username) external {
        require(!userExists(msg.sender), "User already exists");
        //username cannot be empty
        require(bytes(_username).length > 0, "Username cannot be empty");
        userList[msg.sender].username = _username;
        getAllUsers.push(allUserStruct(_username, msg.sender));
    }

    //Get UserName
    function getUserName(address _user) external view returns (string memory) {
        require(userExists(_user), "User does not exist");
        return userList[_user].username;
    }

    //Add Friend
    function addFriend(
        address _friendPubkey,
        string calldata _friendName
    ) external {
        require(userExists(msg.sender), "You must create an account first");
        require(userExists(_friendPubkey), "Friend does not exist");

        //User can not add themselves as a friend
        require(
            msg.sender != _friendPubkey,
            "You cannot add yourself as a friend"
        );

        // Check if friend already exists
        require(
            CheckAddedFriend(msg.sender, _friendPubkey) == false,
            "Friend already added"
        );

        _addFriend(msg.sender, _friendPubkey, _friendName);
        _addFriend(_friendPubkey, msg.sender, userList[msg.sender].username);
    }

    //CheckAddedFriend
    function CheckAddedFriend(
        address pubkey1,
        address pubkey2
    ) internal view returns (bool) {
        if (
            userList[pubkey1].friendList.length >
            userList[pubkey2].friendList.length
        ) {
            address temp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = temp;
        }
        for (uint256 i = 0; i < userList[pubkey1].friendList.length; i++) {
            if (userList[pubkey1].friendList[i].pubkey == pubkey2) {
                return true;
            }
        }
        return false;
    }

    function _addFriend(
        address me,
        address _friendPubkey,
        string memory _friendName
    ) internal {
        friend memory newFriend = friend(_friendPubkey, _friendName);
        userList[me].friendList.push(newFriend);
    }

    //Get my friends
    function getMyFriendList() external view returns (friend[] memory) {
        require(userExists(msg.sender), "You must create an account first");
        return userList[msg.sender].friendList;
    }

    //Get Chat Code
    function getChatCode(
        address pubkey1,
        address pubkey2
    ) internal pure returns (bytes32) {
        // Generate a unique chat code based on the sender and receiver addresses
        if (pubkey1 < pubkey2) {
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else {
            return keccak256(abi.encodePacked(pubkey2, pubkey1));
        }
    }

    //Send Message
    function sendMessage(address _receiver, string calldata _msg) external {
        require(userExists(msg.sender), "You must create an account first");
        require(userExists(_receiver), "Receiver does not exist");

        //User can not send message to themselves
        require(msg.sender != _receiver, "You cannot send message to yourself");

        bytes32 chatCode = getChatCode(msg.sender, _receiver);
        message memory newMessage = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMessage);
    }

    //Read Messages
    function readMessages(
        address _friend
    ) external view returns (message[] memory) {
        require(userExists(msg.sender), "You must create an account first");
        require(userExists(_friend), "Friend does not exist");

        bytes32 chatCode = getChatCode(msg.sender, _friend);
        return allMessages[chatCode];
    }

    //Get All App Users
    function getAllAppUsers() public view returns (allUserStruct[] memory) {
        return getAllUsers;
    }
}
