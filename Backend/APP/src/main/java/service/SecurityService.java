package service;

public interface SecurityService {
    /**
     * Method the check if the password is false
     *
     * @param login    name of the user
     * @param password password of the user
     * @return check if password is false
     */
    boolean checkPassword(String login, String password);
}
