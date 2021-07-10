import socket
import sys

def get_open_ports(target, port_range, verbose_mode=False):
    open_ports = []
    remoteServerIP  = socket.gethostbyname(target)
    print("did remote server ip", remoteServerIP)
    try:
      for port in range(1, 3000):  
          print("in for loop", port)
          sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
          result = sock.connect((remoteServerIP, port))
          print("checked ports")
          if result == 0:
              open_ports.append(result)
              print("Port: " + port)
          sock.close()

    except socket.gaierror:
        print('Hostname could not be resolved. Exiting')
        sys.exit()

    except socket.error:
        print("Couldn't connect to server")
        sys.exit()

    if(verbose_mode):
        print("verbose_mode on")

    return(open_ports)

def print_something(printthis):
    print(printthis)