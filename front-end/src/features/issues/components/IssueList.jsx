"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/hooks/useRole";

const IssueList = ({ issues = [] }) => {
  const router = useRouter();
  const { isAdmin, isAgent, isCitizen } = useRole();

  // ✅ Safe fallback
  const safeIssues = Array.isArray(issues)
    ? issues.filter((item) => item && item.id)
    : [];

  const issueListTitle = isAdmin
    ? "All issues"
    : isAgent
    ? "Assigned issues"
    : "Reported issues";

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-6 mt-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{issueListTitle}</h2>

          {isCitizen && (
            <button
              onClick={() => router.push("/issues/report")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Add Report
            </button>
          )}
        </div>

        {/* Empty State */}
        {safeIssues.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No reports found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-3 px-6">Title</th>
                  <th className="py-3 px-6">Location</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6">Posted Date</th>
                  <th className="py-3 px-6">Updated Date</th>
                </tr>
              </thead>

              <tbody>
                {safeIssues.map((item) => {
                  const title = item.title || "No title";
                  const location = item.location || "-";
                  const status = item.status || "-";

                  const createdAt = item.createdAt
                    ? item.createdAt.slice(0, 10)
                    : "-";

                  const updatedAt = item.updatedAt
                    ? item.updatedAt.slice(0, 10)
                    : "-";

                  return (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => router.push(`/issues/${item.id}`)}
                    >
                      <td className="py-3 px-6 font-medium">
                        {title.length > 20
                          ? title.slice(0, 20) + "..."
                          : title}
                      </td>

                      <td className="py-3 px-6 text-gray-600">
                        {location}
                      </td>

                      <td className="py-3 px-6 text-gray-600">
                        {status}
                      </td>

                      <td className="py-3 px-6 text-gray-600">
                        {createdAt}
                      </td>

                      <td className="py-3 px-6 text-gray-600">
                        {updatedAt}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueList;


{/*"use client";


import React from 'react'
import { useRouter } from "next/navigation";
import { useRole } from '@/hooks/useRole';

const IssueList = ({ issues }) => {
  const router = useRouter();
  const {isAdmin, isAgent, isCitizen} = useRole()

   const issuelist = isAdmin
  ? "All issues"
  : isAgent
  ? "Asigned issues"
  : "Reported issues";

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-6 mt-6">

       
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {issuelist}
          </h2>

          {isCitizen && (
          <button
            onClick={() => router.push("/issues/report")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Add Report
          </button>
      )}
        </div>

        
        {issues.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No reports found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-3 px-6">Title</th>
                  <th className="py-3 px-6">location</th>
                  <th className="py-3 px-6">status</th>
                  <th className="py-3 px-6">Posted Date</th>
                  <th className="py-3 px-6">Updated Date</th>
                </tr>
              </thead>

              <tbody>
                {issues.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => router.push(`/issues/${item.id}`)}
                  >
                    <td className="py-3 px-6 font-medium">
                      {item.title.length > 20
                        ? item.title.slice(0, 20) + "..."
                        : item.title}
                    </td>

                    <td className="py-3 px-6 text-gray-600">
                      {item.location}
                    </td>

                    <td className="py-3 px-6 text-gray-600">
                      {item.status}
                    </td>

                    <td className="py-3 px-6 text-gray-600">
                      {item.createdAt.slice(0, 10)}
                    </td>

                    <td className="py-3 px-6 text-gray-600">
                      {item.updatedAt.slice(0, 10)}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default IssueList   */}


{/*

import IssueCard from "./IssueCard";

export default function IssueList({ issues }) {
  return (
    <div className="grid gap-4">
      {issues?.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
} */}


{/*"use client";


import React from 'react'
import { useRouter } from "next/navigation";
import { useRole } from '@/hooks/useRole';

const IssueList = ({ issue }) => {
  const router = useRouter();
  const {isAdmin, isAgent, isCitizen} = useRole()

   const issuelist = isAdmin
  ? "All issues"
  : isAgent
  ? "Asigned issues"
  : "Reported issues";

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-xl p-6 mt-6">

      
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {issuelist}
          </h2>

          {isCitizen && (
          <button
            onClick={() => router.push("/issues/report")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Add Report
          </button>
      )}
        </div>

        
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-3 px-6">Title</th>
                  <th className="py-3 px-6">location</th>
                  <th className="py-3 px-6">status</th>
                  <th className="py-3 px-6">Posted Date</th>
                  <th className="py-3 px-6">Updated Date</th>
                </tr>
              </thead>

              <tbody>
                  <tr
                    key={issue.id}
                    className="border-b hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => router.push(`/issues/${issue.id}`)}
                  >
                    <td className="py-3 px-6 font-medium">
                      {issue.title.length > 20
                        ? issue.title.slice(0, 20) + "..."
                        : issue.title}
                    </td>

                    <td className="py-3 px-6 text-gray-600">
                      {issue.location}
                    </td>

                    <td className="py-3 px-6 text-gray-600">
                      {issue.status}
                    </td>

                    <td className="py-3 px-6 text-gray-600">
                      {issue  .createdAt.slice(0, 10)}
                    </td>

                    <td className="py-3 px-6 text-gray-600">
                      {issue.updatedAt.slice(0, 10)}
                    </td>

                  </tr>
                
              </tbody>

            </table>
          </div>
        
      </div>
    </div>
  )
}

export default IssueList */}