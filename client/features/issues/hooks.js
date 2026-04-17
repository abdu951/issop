import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllIssues,
  getIssueById,
  getMyIssues,
  createIssue,
  assignIssue,
  resolveIssue,
  respondToIssue,
  FilterGet,
} from "./api";

import toast from "react-hot-toast"

const queryClient = useQueryClient;

// GET ALL
export const useAllIssues = () =>
  useQuery({
    queryKey: ["issues"],
    queryFn: getAllIssues,
  });



export const useFilterGet = (status) => {
  return useQuery({
    queryKey: ["issues", status], // 🔥 VERY IMPORTANT
    queryFn: () => FilterGet(status),
  });
};



// GET BY ID
export const useIssueById = (id) =>
  useQuery({
    queryKey: ["issue", id],
    queryFn: () => getIssueById(id),
  });

// GET MY
export const useMyIssues = () =>
  useQuery({
    queryKey: ["my-issues"],
    queryFn: getMyIssues,
  });

// CREATE
export const useCreateIssue = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createIssue,
    onSuccess: () => {
      qc.invalidateQueries(["issues"]);
      qc.invalidateQueries(["my-issues"]);
    },
  });
};

// ASSIGN
export const useAssignIssue = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: assignIssue,
    onSuccess: () => {
      qc.invalidateQueries(["issues"]);
    },
  });
};

// RESOLVE
export const useResolveIssue = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: resolveIssue,
    onSuccess: () => {
      qc.invalidateQueries(["issues"]);
    },
  });
};


export const useRespondToIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: respondToIssue,

    onSuccess: () => {
      toast.success("Action completed");

      // 🔁 Refresh issues list (VERY IMPORTANT)
      queryClient.invalidateQueries(["issues"]);
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Action failed");
    },
  });
};