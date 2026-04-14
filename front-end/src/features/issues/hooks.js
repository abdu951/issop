import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllIssues,
  getMyIssues,
  createIssue,
  assignIssue,
  resolveIssue,
} from "./api";

const queryClient = useQueryClient;

// GET ALL
export const useAllIssues = () =>
  useQuery({
    queryKey: ["issues"],
    queryFn: getAllIssues,
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