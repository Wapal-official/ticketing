import { reactive } from "vue";
import { io } from "socket.io-client";

interface UploadSocket {
  connected: boolean;
  progress: number;
  uploadSummary: string;
  previousResult: string;
  uploading: boolean;
  totalFiles: number;
  showUploadBar: boolean;
  showUploadError: boolean;
}

export const uploadSocketState = reactive<UploadSocket>({
  connected: false,
  progress: 0,
  uploadSummary: "",
  previousResult: "",
  uploading: false,
  showUploadBar: false,
  totalFiles: 0,
  showUploadError: false,
});

const URL = process.env.baseURL ? process.env.baseURL : "http://localhost:3000";
export const socket = io(URL);

socket.on("connect", () => {
  uploadSocketState.connected = true;
});

socket.on("disconnect", () => {
  uploadSocketState.connected = false;
});

const uploadingFiles = (output: any) => {
  const lines = output.split("\n");

  if (lines[0].includes("Preparing")) {
    const startIndex = lines[0].indexOf("Preparing");

    const endIndex = lines[0].indexOf("files") + "files".length;

    const result = lines[0].substring(startIndex, endIndex);

    if (uploadSocketState.previousResult !== result) {
      uploadSocketState.progress++;
      uploadSocketState.previousResult = result;
    }
  }

  if (lines[0].includes("Deploying")) {
    const startIndex = lines[0].indexOf("Deploying");

    const endIndex = lines[0].indexOf("files") + "files".length;

    const result = lines[0].substring(startIndex, endIndex);

    if (uploadSocketState.previousResult !== result) {
      uploadSocketState.progress++;
      uploadSocketState.previousResult = result;
    }
  }
};

socket.on("output", (output) => {
  uploadingFiles(output);
});

socket.on("post-deployment", (response) => {
  let stringRes = response;
  stringRes = stringRes.slice(10);

  const res = JSON.parse(stringRes);

  uploadSocketState.uploadSummary = res.msg;

  uploadSocketState.uploading = false;
});
