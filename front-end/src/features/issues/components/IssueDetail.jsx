import React from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useRole } from '@/hooks/useRole';

const IssueDetail = ({ issue }) => {

    const router = useRouter()
    const {isAdmin, isAgent} = useRole()

     const navigate = isAdmin
    ? "/issues"
    : isAgent
    ? "/issues/assign"
    : "/issues/my";


  return (
    <div> 

    <div className="max-w-4xl mx-auto px-6 py-24">

        <div onClick={() => router.push(navigate)} className="flex gap-2 cursor-pointer text-[#ffa843] hover:text-[#ffa743c0] pb-7">
            <IoArrowBack size={20} />
            <p>Back to Opportunities</p> 
        </div>

      {/* Image */}
      <img
        src={issue.imageUrl}
        alt={issue.title}
        className="w-full h-[350px] object-cover rounded-xl"
      />

      {/* Title */}
      <h1 className="text-3xl text-gray-900 font-semibold mt-6">
        {issue.title}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-col gap-4 mt-3 text-sm text-[#ffa843]">
        <span className="bg-gray-100 px-3 py-1 rounded w-fit">
          {issue.location}
        </span>

        <span className="bg-gray-100 px-3 py-1 rounded w-fit">
          {issue.status}
        </span>
      </div>

      {/* Description */}
      <p className="mt-6 text-gray-600 leading-relaxed">
        {issue.description}
      </p>

      {/* Apply Button */}
      <a
        href={"/"}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-8 bg-[#ffa843] hover:bg-[#ffa743c0] text-white px-6 py-3 rounded-lg font-medium transition"
      >
        Apply Now
      </a>

    </div>
    </div>
  )
}

export default IssueDetail