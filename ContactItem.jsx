
// ContactItem.js
import React from 'react';

function ContactItem({ contact, onEdit, onDelete }) {
    return (
        <div style={{ flex: '0 1 30%', padding: '15px', backgroundColor: '#e0f7fa', borderRadius: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <p><strong>Name:</strong> {contact.name}</p>
                <p><strong>Name:</strong> {contact.name}</p>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Phone:</strong> {contact.phone}</p>
                <p><strong>Address:</strong> {contact.address}</p>
                <p><strong>Domain:</strong> {contact.domain}</p>
                <p><strong>Department:</strong> {contact.department}</p>
                <p><strong>GitHub:</strong> <a href={contact.github} target="_blank" rel="noopener noreferrer">{contact.github}</a></p>
                <p><strong>LinkedIn:</strong> <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">{contact.linkedin}</a></p>
                <p><strong>LeetCode:</strong> <a href={contact.leetcode} target="_blank" rel="noopener noreferrer">{contact.leetcode}</a></p>
                <p><strong>HackerRank:</strong> <a href={contact.hackerrank} target="_blank" rel="noopener noreferrer">{contact.hackerrank}</a></p>
                {onEdit && <button onClick={onEdit} style={{ backgroundColor: '#007bff', color: '#fff', padding: '5px 10px', borderRadius: '4px' }}>Edit</button>}
                {onDelete && <button onClick={onDelete} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '5px 10px', borderRadius: '4px' }}>Delete</button>}
            </div>
        </div>
    );
}

export default ContactItem;

