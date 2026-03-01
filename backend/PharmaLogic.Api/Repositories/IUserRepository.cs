using PharmaLogic.Models;

namespace PharmaLogic.Repositories
{
    public interface IUserRepository
    {
        User? GetUserByEmail(string email);
    }
}