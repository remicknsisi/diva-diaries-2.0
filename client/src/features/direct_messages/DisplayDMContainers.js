import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DMContainer from "./DMContainer";
import { fetchMessages } from "./dmsSlice";
import { fetchUsers } from "../users/usersSlice";
import { useNavigate, useParams } from 'react-router-dom';
import ComposeIcon from "../icons/ComposeIcon";
import DropDown from "../DropDown";

function DisplayDMContainers() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams()

    const messages = useSelector((state) => state.messages.entities);
    const users = useSelector((state) => state.users.entities);

    function getUniqueMessagers(arr, key) {
        const uniqueValues = [];
        const seenValues = {};
      
        for (const item of arr) {
          const value = item[key];
          if (!seenValues[value]) {
            seenValues[value] = true;
            uniqueValues.push(value);
          }
        }
      
        return uniqueValues;
      }

      const uniqueRecipientIds = getUniqueMessagers(messages, "recipient_id");
      const currentUser = users.find((u) => u.id === id*1)
      const uniqueSenderIds = currentUser ? getUniqueMessagers(currentUser.received_messages, "user_id") : null
    
      const recipientsToDisplay = users.filter((user) => uniqueRecipientIds.includes(user.id) || uniqueSenderIds.includes(user.id))
      const usersForNewChat = users.map((user) => recipientsToDisplay.includes(user) ? null : user).filter((user) => user!== null && user.id !== id*1)
      const chatOptions = usersForNewChat.map(user => <option value={user.id} key={user.id}>{user.username}</option>)
      const [selectedOption, setSelectedOption] =  useState('')
      const finalChatOptions = [<option>Select a User</option>, ...chatOptions]

    useEffect(() => {
      dispatch(fetchMessages());
      dispatch(fetchUsers());
    }, [])
  
    if(messages){return (
    <>
        <button className="button" onClick={() => navigate(`/`)}>Back</button>
        <div className="start-chat">
        <p>Start a chat with...</p>
        <br/>
        <DropDown setSelectedOption={setSelectedOption} options={finalChatOptions}/>
        <br/>
        <button onClick={() => navigate(`/users/${id}/direct_messages/${selectedOption}`)} className="button">Let's Go! <ComposeIcon/></button>
        </div>
        <p className="heading">All Current Conversations</p> 
        <div className="conversation-list">
            {recipientsToDisplay.map((recipient) => <DMContainer key={recipient.id} recipient={recipient}/>)}
        </div>
    </>
    );} else{
      return(<p>Loading DMs...</p>)
    }
}

export default DisplayDMContainers;