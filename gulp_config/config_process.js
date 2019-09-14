
module.exports = {
    IS_PROD:process.env.NODE_ENV === "prod",
    IS_DEV:process.env.NODE_ENV === "dev",
    IS_TASK_SPRITE:process.env.NODE_ENV === "task_sprite",
};