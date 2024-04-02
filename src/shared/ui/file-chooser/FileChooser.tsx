import * as React from "react";

export interface IFileData {
  file?: File;
  base64?: string;
}

interface IFileChooserProps {
  id: string;
  onChange: (data: IFileData) => void;
  requireBase64: boolean;
  accept: string;
}

const FileChooser: React.FunctionComponent<IFileChooserProps> = ({
  id,
  onChange,
  requireBase64,
  accept = "",
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const file = files && files[0];

    if (!requireBase64 && file) {
      onChange({ file });
    } else {
      const fr = new FileReader();
      fr.addEventListener("load", function () {
        if (file && fr.result) {
          onChange({ file, base64: fr?.result as string });
        }
      });
      if (file) {
        fr.readAsDataURL(file);
      }
    }
  };
  return (
    <input
      id={id}
      style={{ display: "none" }}
      type="file"
      accept={accept}
      onChange={handleImageChange}
    />
  );
};

export default FileChooser;
