import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MedicalRecord } from "@/types/patients";
import { Separator } from "@/components/ui/separator";
import { Calendar, FileImage } from "lucide-react";
import { URL } from "url";
import axios from "axios";

interface AppointmentDetailDialogProps {
  record: MedicalRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MedicalRecordDetailDialog({
  record,
  open,
  onOpenChange,
}: AppointmentDetailDialogProps) {
  if (!record) return null;

  const apiUrl: string = import.meta.env.VITE_API_URL;
  const imageUrl: string = apiUrl + "/images/" + record?.type?.fileUrl;

  useEffect(() => {
    const draw_image_and_boxes = (boxes) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const canvas = document.querySelector("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = 3;
        ctx.font = "18px serif";
        boxes.forEach(([x1, y1, x2, y2, label, confidence]) => {
          // Draw rectangle around the object
          ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

          // Prepare text to display (label and confidence)
          const text = `${label} (${confidence})`;

          // Measure text width for background rectangle
          const textWidth = ctx.measureText(text).width;

          // Draw background rectangle for text
          ctx.fillStyle = "#00FF00";
          ctx.fillRect(x1, y1 - 25, textWidth + 10, 25);

          // Draw text (label and confidence)
          ctx.fillStyle = "#000000";
          ctx.fillText(text, x1, y1 - 7);
        });
      };
    };

    const getAIResponse = async () => {
      const response = await fetch(imageUrl, {
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "deflate, gzip",
        },
        method: "GET",
      });
      // here image is url/location of image
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });
      // here image is url/location of image

      const data = new FormData();
      data.append("image_file", file);
      const aiResponse = await fetch("http://localhost:8000/detect", {
        method: "post",
        body: data,
      });
      const boxes = await aiResponse.json();
      draw_image_and_boxes(boxes);
    };
    getAIResponse();
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileImage className="h-5 w-5 text-medical-orange" />
            {record.title}
          </DialogTitle>
          <DialogDescription>
            Dr. {record.doctor} -{" "}
            {new Date(record.createdAt).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {record?.type?.scanType === "X_Ray" && (
            <div className="space-y-2">
              <h3 className="font-medium">X-Ray Image</h3>
              <div className="flex justify-center">
                {/* <img
                  src={apiUrl + '/images/' + record?.type?.fileUrl}
                  alt="X-Ray scan"
                  className="rounded-md object-cover max-h-[300px]"
                /> */}
                <canvas className="rounded-md object-cover max-h-[300px]"></canvas>
              </div>
            </div>
          )}

          <div>
            <h3 className="font-medium">Notes</h3>
            <p className="text-sm text-gray-600 mt-1">
              {record.description ||
                "No additional notes available for this record."}
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium">record Details</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{record?.type?.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="capitalize font-medium">{record.type.scanType}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
