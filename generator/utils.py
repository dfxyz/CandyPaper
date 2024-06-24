from typing import Optional


class Color:
    h: int  # hue, [0, 360)
    s: int  # saturation, [0, 100]
    v: int  # value, [0, 100]
    r: int  # red, [0, 255]
    g: int  # green, [0, 255]
    b: int  # blue, [0, 255]

    def __init__(self, h: int, s: int, v: int):
        if h >= 360 or h < 0:
            raise ValueError("h not in range `[0, 360)`")
        if s > 100 or s < 0:
            raise ValueError("s not in range `[0, 100]`")
        if v > 100 or v < 0:
            raise ValueError("v not in range `[0, 100]`")
        self.h = h
        self.s = s
        self.v = v

        _s = s / 100
        _v = v / 100

        c = _v * _s
        x = c * (1 - abs((h / 60) % 2 - 1))
        m = _v - c

        r: float
        g: float
        b: float
        if h < 60:
            r, g, b = c + m, x + m, m
        elif h < 120:
            r, g, b = x + m, c + m, m
        elif h < 180:
            r, g, b = m, c + m, x + m
        elif h < 240:
            r, g, b = m, x + m, c + m
        elif h < 300:
            r, g, b = x + m, m, c + m
        else:
            r, g, b = c + m, m, x + m
        self.r = round(r * 255 + 1e-10)
        self.g = round(g * 255 + 1e-10)
        self.b = round(b * 255 + 1e-10)

    def hex(self) -> str:
        return f"#{self.hex0()}"

    def hex0(self) -> str:
        return f"{self.r:02X}{self.g:02X}{self.b:02X}"

    def bit_shift_number(self) -> int:
        return self.b << 16 | self.g << 8 | self.r

    def __str__(self) -> str:
        return f"HSV:({self.h}, {self.s}, {self.v}); RGB:({self.r}, {self.g}, {self.b}); HEX:{self.hex()}"
