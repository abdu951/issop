import React from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useRole } from '@/hooks/useRole';
import { useAssignIssue, useRespondToIssue } from "@/features/issues/hooks";
import AgentSelect from "./AgentSelect";
import { useState } from "react";

const IssueDetail = ({ issue }) => {
    
    const assign = useAssignIssue();
    const [agentId, setAgentId] = useState("");
    const router = useRouter()
    const { mutate, isPending } = useRespondToIssue();
    const {isAdmin, isAgent} = useRole()

     const navigate = isAdmin
    ? "/issues"
    : isAgent
    ? "/issues/respond"
    : "/issues/my";


    const handleAction = (action) => {
    mutate({
      issueId: issue.id,
      action,
    });
  };


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

      {/* location */}
      <div className="flex flex-col gap-4 mt-3 text-sm text-[#ffa843]">
        <span className="bg-gray-100 px-3 py-1 rounded w-fit">
          {issue.location}
        </span>
        {/* status */}
        <span className="bg-gray-100 px-3 py-1 rounded w-fit">
          {issue.status}
        </span>
      </div>

      {/* Description */}
      <p className="mt-6 text-gray-600 leading-relaxed">
        {issue.description}
      </p>


      {isAdmin ? (
        <div className="space-x-2">
          <AgentSelect onSelect={setAgentId} />
      
          <button
            disabled={!agentId}
            onClick={() =>
              assign.mutate({
                issueId: issue.id,
                agentId,
              })
            }
            className="bg-blue-500 text-white px-3 py-1"
          >
            Assign
          </button>
        </div>
      ) : isAgent ? (
        <div className="flex gap-2 mt-3">

      <button
        disabled={isPending}
        onClick={() => {
          handleAction("accept")
          router.push(`/issues/resolve/${issue.id}`)
        }}
        className="px-3 py-1 bg-green-600 text-white rounded"
      >
        Accept
      </button>

      <button
        disabled={isPending}
        onClick={() => handleAction("reject")}
        className="px-3 py-1 bg-red-600 text-white rounded"
      >
        Reject
      </button>
    </div>

      ) : null}


    </div>
    </div>
  )
}

export default IssueDetail