import React from 'react'
import { convertDate } from '../lib/CreateData';

export default function CommentDetails({ comment }) {
    console.log(comment);
    const { commentCreator: { name, photo }, content, createdAt } = comment;
    return (
            <div className='flex items-center p-4 gap-3'>
                <img className="size-10 rounded-full" src={photo} alt />
                <div>
                    <p className='text-gray-600'>{name}</p>
                    <p className='text-gray-400'>{convertDate(createdAt)}</p>
                    <p className='text-black'>{content}</p>
                </div>
            </div>
    )
}