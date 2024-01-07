const { prisma } = require('../prisma/prisma-client');

/**
 *  @route GET /api/employees
 *  @desc Получить всех сотрудников
 *  @access Private
 */
const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json(employees);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Не удалось получить сотрудников' });
  }
};

/**
 *  @route POST /api/employees/add
 *  @desc Добавить сотрудника
 *  @access Private
 */
const add = async (req, res) => {
  try {
    const { firstName, lastName, age, adress } = req.body;

    if (!firstName || !lastName || !age || !adress) {
      return res.status(400).json({ message: "Все поля обязательные для заполнения" });
    }

    const employee = await prisma.employee.create({
      data: {
        ...req.body,
        userId: req.user.id
      }
    });

    return res.status(201).json(employee);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Что-то пошло не так" });
  }
};

/**
 *  @route POST /api/employees/remove/:id
 *  @desc Удалить сотрудника
 *  @access Private
 */

const remove = async (req, res) => {
  try {
    const { id } = req.body;
    await prisma.employee.delete({
      where: {
        id
      }
    });

    return res.status(204).json({ message: "Сотрудник удален" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Не удалось удалить сотрудника" });
  }
};

/**
 *  @route PUT /api/employees/edit/:id
 *  @desc Редактировать сотрудника
 *  @access Private
 */
const edit = async (req, res) => {
  try {
    const data = req.body;
    const id = data.id;

    await prisma.employee.update({
      where: {
        id
      },
      data
    });

    return res.status(204).json({ message: "Данные сотрудника изменены" })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Не удалось отредактировать сотрудника" });
  }
};


/**
 *  @route GET /api/employees/:id
 *  @desc Получить сотрудника по id
 *  @access Private
 */
const single = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: {
        id
      }
    });

    return res.status(200).json(employee);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Не удалось получить сотрудника" });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  single
}