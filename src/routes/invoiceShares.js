import { Router } from 'express';
import {
  getInvoiceShares,
  createInvoiceShare,
  getInvoiceShare,
  updateInvoiceShare,
  deleteInvoiceShare
} from '../controllers/invoiceSharesController.js';

const router = Router();

router.get('/', getInvoiceShares);
router.post('/', createInvoiceShare);
router.get('/:id', getInvoiceShare);
router.put('/:id', updateInvoiceShare);
router.delete('/:id', deleteInvoiceShare);

export default router;
