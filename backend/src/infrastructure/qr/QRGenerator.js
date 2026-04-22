import QRCode from 'qrcode';

export class QRGenerator {
  async generar(texto) {
    try {
      const qrDataUrl = await QRCode.toDataURL(texto, {
        width: 300,
        margin: 2,
      });
      return qrDataUrl;
    } catch (error) {
      throw new Error(`Error generando QR: ${error.message}`);
    }
  }
}
