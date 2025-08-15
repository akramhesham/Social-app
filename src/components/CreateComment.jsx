import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createComment } from '../API/CreateComment.api'

export default function CreateComment({ id }) {
    const queryClient = useQueryClient()
    const { isPending, data, mutate } = useMutation({
        mutationFn: createComment,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments', id] })
    })
    function addComment(e) {
        if(e.key==='Enter'){
            mutate({ content: e.target.value, post: id })
        }
    }
    return (

        <div>
            {isPending&&<h5 className='text-black'>Posting...</h5>}
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Comment</label>
            <textarea onKeyDown={addComment} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." defaultValue={""} />
        </div>

    )
}
