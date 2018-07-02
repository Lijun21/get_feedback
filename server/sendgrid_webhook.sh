# a tiny script to automatically restart ocaltunnel if it crashes
function localtunnel {
  lt -s sfdsdfithdnsdwi --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
