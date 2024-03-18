import { useState, useEffect } from "react";
import { Alert } from "@material-tailwind/react";

function CustomAlert({ message }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Alert
      open={open}
      color="red"
      animate={{
        mount: { y: 0 },
        unmount: { y: 100 },
      }}
    >
      {message}
    </Alert>
  );
}

export default CustomAlert