import Ticket from '../models/Ticket';
import TicketRelated from '../models/TicketRelated';
import TicketProblem from '../models/TicketProblem';
import TicketCriticidad from '../models/TicketCriticidad';
import TicketStatus from '../models/TicketStatus';
import TicketMessage from '../models/TicketMessage';
import User from '../models/User';

class TicketControler {
  async getList(req, res) {
    const tickets = await Ticket.findAll({
      includes: [
        { model: TicketStatus, attributes: ['description'] },
        { model: TicketProblem, attributes: ['description'] },
        { model: TicketCriticidad, attributes: ['description'] },
        { model: TicketRelated, attributes: ['description'] },
      ],
    });
    if (tickets.length) {
      return res.status(200).json(tickets);
    }
    return res.status(204).json({ msg: 'Nenhum ticket encontrado' });
  }
  async getOne(req, res) {
    const { id } = req.params;
    const tickets = await Ticket.findOne({
      includes: [
        { model: User, attributes: ['name', 'email'] },
        { model: TicketStatus, attributes: ['description'] },
        { model: TicketProblem, attributes: ['description'] },
        { model: TicketCriticidad, attributes: ['description'] },
        { model: TicketRelated, attributes: ['description'] },
      ],
      where: { id },
    });
    const messages = await TicketMessage.findAll({
      includes: [{ model: User, attributes: ['name', 'email'] }],
      where: { id_ticket: id },
    });
    if (tickets) {
      return res.status(200).json({ ticket: tickets, messages: messages });
    }
    return res.status(204).json({ msg: 'Nenhum ticket encontrado' });
  }
  async insert(req, res) {
    const {
      title,
      description,
      id_requester,
      id_responsible,
      id_related,
      id_problem,
      id_criticidad,
      id_status,
      message,
    } = req.body;
    try {
      const ticket = await Ticket.create({
        title,
        description,
        id_requester,
        id_responsible,
        id_related,
        id_problem,
        id_criticidad,
        id_status,
      });
      if (ticket && message) {
        await TicketMessage.create({
          id_user: id_requester,
          id_ticket: ticket.id,
          message,
        });
      }
      return res.status(200).json(ticket);
    } catch (err) {
      return res.status(400).json({ msg: 'Erro ao gerar ticket.' });
    }
  }
  async insertMessage(req, res) {
    const { userUUID } = req;
    const user = await User.findOne({ where: { uuid: userUUID } });
    const { id_ticket, message } = req.body;
    try {
      await TicketMessage.create({
        id_user: user.id,
        id_ticket: id_ticket,
        message,
      });
      return res.status(200).json('Mensagem enviada com sucesso!');
    } catch (err) {
      return res.status(400).json({ msg: 'Erro ao gerar mensagem.' });
    }
  }
}
export default new TicketControler();
