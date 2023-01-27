import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class DownloadService {
  public downloadFile(content: string, fileName: string, type: string) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
}
