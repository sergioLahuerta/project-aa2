using PharmaLogic.Data;
using PharmaLogic.Models;
using PharmaLogic.Repositories;

namespace PharmaLogic.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly JsonDbContext _context;

        public UserRepository(JsonDbContext context)
        {
            _context = context;
        }

        public User? GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
        }
    }
}