import { Router, Request, Response } from "express";
import { ITransaction } from "../../interfaces/ITransaction";
import { IReadTransactionDTO } from "../../interfaces/dto/IReadTransactionDTO";
import { TransactionRepository } from "../../repositories/TransactionRepository";
import { IBook } from "../../interfaces/IBook";
const router: Router = Router();

router.get("", async (req: Request, res: Response) => {
  try {
    const transactions = await new TransactionRepository().getAll();
    let transactions_dto: IReadTransactionDTO[] = [];
    for(let i = 0;i<transactions.length;i++){ 
      transactions_dto.push({
        transaction_id: transactions[i]['transaction_id'],
        staff: {
          name: transactions[i]['staff_name'],
          surname: transactions[i]['staff_surname'],
          phone_number: transactions[i]['staff_phone_number'],
          email: transactions[i]['staff_email'],
          id_number: transactions[i]['staff_id_number']
        },
        member: {
          name: transactions[i]['member_name'],
          surname: transactions[i]['member_surname'],
          phone_number: transactions[i]['member_phone_number'],
          email: transactions[i]['member_email'],
          id_number: transactions[i]['member_id_number']
        },
        total_books: transactions[i]['total_books'],
        status: transactions[i]['status'],
        date_created: transactions[i]['date_created'],
        due_date: transactions[i]['due_date']
      });
    }
    res.status(200).send(transactions_dto);
    console.log(transactions);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const transactions = await new TransactionRepository().getById(id);
    
    let books: IBook[] = [];
    if(transactions.length === 0 || transactions === undefined){
      return res.status(401).send('Not Found');
    }

    console.log(transactions)
    const transaction = {
      transaction_id: 0,
      status: '',
      staff: {},
      member: {},
      books: [],
      due_date: '',
      date: ''
    }

    for(let i = 0; i < transactions.length;i++){
      transaction.books.push({
          book_id: transactions[i]['book_id'],
          status: transactions[i]['status'],
          title: transactions[i]['title'],
          isbn: transactions[i]['isbn'],
          year: transactions[i]['year'],
          publisher: transactions[i]['publisher'],
          author: transactions[i]['author'],
          returned: transactions[i]['returned'],
          date_returned: transactions[i]['date_returned']
        });
        transaction.transaction_id = transactions[i]['transaction_id'];
        transaction.status = transactions[i]['status'];
        transaction.due_date = transactions[i]['due_date'];
        transaction.date = transactions[i]['date_created'];
        transaction.staff = {
          name: transactions[i]['staff_name'],
          surname: transactions[i]['staff_surname'],
          email: transactions[i]['staff_email'],
          phone_number: transactions[i]['staff_phone_number'],
          id_number: transactions[i]['staff_id_number'],
        },
        transaction.member = {
          name: transactions[i]['member_name'],
          surname: transactions[i]['member_surname'],
          email: transactions[i]['member_email'],
          phone_number: transactions[i]['member_phone_number'],
          id_number: transactions[i]['member_id_number'],
        }
    }
    
    res.send(transaction).status(200);
  } catch (err) {
    res.send(err.message).status(500);
  }
});

export default router;
