import jsPDF from "jspdf";
import Transaksi from "./Transaksi";

const StrukPrinter = ({ transaksiItem }) => {
  const printPDF = () => {
    const doc = new jsPDF();
    const element = document.getElementById("content");
    doc.fromHTML(element, 15, 15, { width: 170 });
    doc.save("struk.pdf");
  };

  return (
    <div>
      <Transaksi transaksiItem={transaksiItem} />
      <button onClick={printPDF()}>Print PDF</button>
    </div>
  );
};

export default StrukPrinter;
