import api from "@/lib/axios";

// create issue
export const createIssue = async (data) => {
  const res = await api.post("/issues", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// get all issues
export const getAllIssues = async () => {
  const res = await api.get("/issues");
  return res.data;
};

// get issue by id
export const getIssueById = async (id) => {
  const res = await api.get(`/issues/${id}`);
  return res.data;
};

// get my issues
export const getMyIssues = async () => {
  const res = await api.get("/issues/me");
  return res.data;
};

// assign issue
export const assignIssue = async (data) => {
  const res = await api.post("/issues/assign", data);
  return res.data;
};

// resolve issue
export const resolveIssue = async (issueId) => {
  const res = await api.post("/issues/resolve", { issueId });
  return res.data;
};